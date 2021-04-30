import * as mobilenet from '@tensorflow-models/mobilenet';
import * as tfnode from '@tensorflow/tfjs-node';
import { mocked } from 'ts-jest/utils';
import { default as mobilenetLib } from './mobilenet';

jest.mock('@tensorflow-models/mobilenet');
jest.mock('@tensorflow/tfjs-node');

describe('Mobilenet', () => {
  let mobilenetMock: jest.Mocked<typeof mobilenet>;
  let mobilenetModelMock: jest.Mocked<mobilenet.MobileNet>;
  let tfnodeMock: jest.Mocked<typeof tfnode>;

  beforeEach(() => {
    mobilenetModelMock = {
      classify: jest.fn(),
    } as never;

    mobilenetMock = mocked(mobilenet);
    mobilenetMock.load.mockResolvedValue(mobilenetModelMock);

    tfnodeMock = mocked(tfnode) as never;

    mobilenetLib.mobilenetModel = undefined;
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('loadModel', () => {
    it('should load the model once with custom version', async () => {
      delete process.env.MODEL_PATH;

      await mobilenetLib.loadModel();
      const actual = await mobilenetLib.loadModel();

      expect(actual).toBe(mobilenetModelMock);
      expect(actual).toBe(mobilenetLib.mobilenetModel);
      expect(mobilenetMock.load).toHaveBeenCalledTimes(1);
      expect(mobilenetMock.load).toHaveBeenCalledWith({
        version: 2,
        alpha: 1.0,
        modelUrl: undefined,
      });
    });

    it('should load the model once with custom model url', async () => {
      const customModelUrl = 'custom-model-path';
      process.env.MODEL_PATH = customModelUrl;

      const actual = await mobilenetLib.loadModel();

      expect(actual).toBe(mobilenetModelMock);
      expect(actual).toBe(mobilenetLib.mobilenetModel);
      expect(mobilenetMock.load).toHaveBeenCalledTimes(1);
      expect(mobilenetMock.load).toHaveBeenCalledWith({
        version: 2,
        alpha: 1.0,
        modelUrl: `file://${customModelUrl}`,
      });
    });
  });

  describe('classify', () => {
    const buffer: Buffer = Buffer.from('');
    const classifyResult = {} as never;
    const tfimage = {} as never;
    const defaultTopK = 3;

    let loadModelSpy: jest.SpyInstance;

    beforeEach(() => {
      mobilenetModelMock.classify.mockResolvedValue(classifyResult);
      (tfnodeMock.node as jest.Mocked<
        typeof tfnode.node
      >).decodeImage.mockReturnValue(tfimage);

      loadModelSpy = jest.spyOn(mobilenetLib, 'loadModel');
    });

    it('should call loadModel when the model is not loaded', async () => {
      mobilenetLib.mobilenetModel = undefined;

      await mobilenetLib.classify(buffer);

      expect(loadModelSpy).toHaveBeenCalled();
    });

    it.each([[undefined], [10]])(
      'should call classify function with tfimage Tensor3D, topk',
      async () => {
        mobilenetLib.mobilenetModel = mobilenetModelMock;

        const actual = await mobilenetLib.classify(buffer);

        expect(actual).toEqual(classifyResult);
        expect(tfnodeMock.node.decodeImage).toHaveBeenCalledWith(buffer);
        expect(mobilenetModelMock.classify).toHaveBeenCalledWith(
          tfimage,
          defaultTopK,
        );
      },
    );
  });
});
