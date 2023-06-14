import { Request, Response, Router } from 'express';
import NeuralSentenceSearch from '../../utils/search';
import data from '../../utils/data';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
  try {
    const { q, slice = 2000 } = req.query;

    const sentences = data
      .split('\n\n')
      .map((_) => _.split('. '))
      .flat()
      .slice(0, parseInt(slice as string));

    console.log(sentences.length);

    const neuralSearch = new NeuralSentenceSearch();
    await neuralSearch.initialize();

    const timeStart = Date.now();

    for (const item of sentences) {
      await neuralSearch.addClass(item, item);
    }

    console.log('Search begin');
    const result = await neuralSearch.search(q);
    const endTime = Date.now();
    console.log(`Search ended in ${(endTime - timeStart) / 1000}s`);

    res.json(result);
  } catch (error) {
    console.error('An error ocurred:', error);
    res.status(500).json(error);
  }
});

export default router;
