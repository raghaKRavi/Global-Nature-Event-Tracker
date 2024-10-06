import { Request, Response } from 'express';
import cache from 'memory-cache';
import NaturalEventsService from '../../domain/service/NaturalEventsService'; // Path to NaturalEventsService
import { getCategoriesDetail } from './NaturalEventsController'; // Import your controller function


jest.mock('memory-cache', () => ({
 get: jest.fn(),
 put: jest.fn(),
}));


// Mock NaturalEventsService
jest.mock('../../domain/service/NaturalEventsService');


const mockedNaturalEventsService = NaturalEventsService as jest.Mocked<typeof NaturalEventsService>;


describe('getCategoriesDetail', () => {
 let req: Partial<Request>;
 let res: Partial<Response>;
 let mockJson: jest.Mock;
 let mockStatus: jest.Mock;


 beforeEach(() => {
   req = {};
   mockJson = jest.fn();
   mockStatus = jest.fn(() => ({ json: mockJson }));
   res = {
     status: mockStatus,
     json: mockJson,
   };
   jest.clearAllMocks(); // Clear mock calls between tests
 });


 it('should return cached categories if available', async () => {
   const cachedCategories = { success: true, body: [{ id: '1', title: 'Category 1' }] };
   (cache.get as jest.Mock).mockReturnValue(cachedCategories);


   await getCategoriesDetail(req as Request, res as Response);


   expect(cache.get).toHaveBeenCalledWith('categories');
   expect(res.status).toHaveBeenCalledWith(200);
   expect(res.json).toHaveBeenCalledWith(cachedCategories);
 });


 it('should fetch categories and cache them if not cached', async () => {
   // Mock cache to return null (i.e., no cached categories)
   (cache.get as jest.Mock).mockReturnValue(null);


   // Mock getCategories to resolve with a response
   const serviceResponse = { success: true, body: [{ id: '1', title: 'Category 1' }] };
   (mockedNaturalEventsService.prototype.getCategories as jest.Mock).mockResolvedValue(serviceResponse);


   await getCategoriesDetail(req as Request, res as Response);


   expect(mockedNaturalEventsService.prototype.getCategories).toHaveBeenCalled();
   expect(cache.put).toHaveBeenCalledWith('categories', serviceResponse, 5 * 60 * 1000);
   expect(res.status).toHaveBeenCalledWith(200);
   expect(res.json).toHaveBeenCalledWith(serviceResponse);
 });


 it('should return 500 if an error occurs while fetching categories', async () => {
   (cache.get as jest.Mock).mockReturnValue(null);


   // Mock getCategories to reject with an error
   (mockedNaturalEventsService.prototype.getCategories as jest.Mock).mockRejectedValue(new Error('Error fetching data'));


   await getCategoriesDetail(req as Request, res as Response);


   expect(res.status).toHaveBeenCalledWith(500);
   expect(res.json).toHaveBeenCalledWith({ message: 'Error fetching data' });
 });
});

