import { jest } from "@jest/globals";
import { recommendationService }  from "../../src/services/recommendationsService.js";
import { recommendationRepository }  from "../../src/repositories/recommendationRepository.js";
import { createAtLeastTenRecomendations, createRecomendationsWithRandomScores, recommendation, recommendationBody } from "../integration/factories/createRecomendation.js";
import { faker } from "@faker-js/faker";
import { deleteAllData } from "../integration/factories/deleteAllData";
import { prisma } from "../../src/database.js";

beforeEach(async() => {
    await deleteAllData();
});


describe("create recommendation", ()=>{

    it("Should insert a recommendation" , async ()=>{
        jest.spyOn(recommendationRepository, "findByName").mockImplementationOnce((): any => {});
        jest.spyOn(recommendationRepository, "create").mockImplementationOnce((): any => {});
        const data = recommendation()
        await recommendationService.insert(data);
        expect(recommendationRepository.findByName).toBeCalled();
        expect(recommendationRepository.create).toBeCalled();

    })

    it("Should not create a recommendation with the same name", async ()=>{
        const data = recommendation()       
        jest.spyOn(recommendationRepository, "findByName").mockImplementationOnce((): any => {
            return data
        });
        const promise = recommendationService.insert(data);
        expect(promise).rejects.toEqual({ message: "Recommendations names must be unique", type: "conflict" });
    });    

})

describe("upvote recommendation ",()=>{

    it("Should upvote a recommendation" , async ()=>{
        const data = await recommendationBody()  
        jest.spyOn(recommendationRepository, "find").mockResolvedValueOnce(data)
        jest.spyOn(recommendationRepository, "updateScore").mockResolvedValueOnce(data);
        await recommendationService.upvote(data.id);
        expect(recommendationRepository.updateScore).toHaveBeenCalled();

    })

    it("Should not upvote an invalid recommendation" , async ()=>{
        jest.spyOn(recommendationRepository, "find").mockResolvedValueOnce(null);        
        const promise = recommendationService.upvote(0);
        expect(promise).rejects.toEqual({ message: "",type: "not_found" });

    })  
})


describe("downvote recommendation ",()=>{

    it("Should downvote a recommendation" , async ()=>{
        const data = await recommendationBody() 
        jest.spyOn(recommendationRepository, "find").mockResolvedValueOnce(data)
        jest.spyOn(recommendationRepository, "updateScore").mockResolvedValueOnce(data);
        await recommendationService.downvote(data.id);
        expect(recommendationRepository.updateScore).toHaveBeenCalled();

    })

    it("Should not downvote an invalide recommendation" , async ()=>{
        jest.spyOn(recommendationRepository, "find").mockResolvedValueOnce(null);        
        const promise = recommendationService.downvote(0);
        expect(promise).rejects.toEqual({ message: "",type: "not_found" });

    })

    it("Should downvote a recommendation with score less than -5" , async ()=>{
        const data = await recommendationBody() 
        data.score = -6
        jest.spyOn(recommendationRepository, "find").mockResolvedValueOnce(data)
        jest.spyOn(recommendationRepository, "updateScore").mockResolvedValueOnce(data);
        jest.spyOn(recommendationRepository,"remove").mockImplementationOnce(null)
        await recommendationService.downvote(data.id)
        expect(recommendationRepository.remove).toHaveBeenCalled();
    })

})

describe("get recommendation by Id", ()=>{

    it("Should return a recommendation" , async ()=>{
        const data = await recommendationBody() 
        jest.spyOn(recommendationRepository,"find").mockResolvedValueOnce(data)
        await recommendationService.getById(data.id)
        expect(recommendationRepository.find).toHaveBeenCalled()
    })

    it("Should not return a recommendation" , async ()=>{
        const data = await recommendationBody() 
        jest.spyOn(recommendationRepository,"find").mockResolvedValueOnce(undefined)
        const promise = recommendationService.getById(0)
        expect(promise).rejects.toEqual({ message: "",type: "not_found" })
    })

})

describe("get all recommendations", ()=>{

    it("Should return all recommendations" , async ()=>{
        const data = await createAtLeastTenRecomendations()
        jest.spyOn(recommendationRepository,"findAll").mockResolvedValueOnce(data)
        await recommendationService.get()
        expect(recommendationRepository.findAll).toHaveBeenCalled()
    })   

})

describe("get top recommendations", ()=>{

    it("Should return all recommendations" , async ()=>{
        const amount = parseInt(faker.finance.amount(0,15,0))
        const data = await createRecomendationsWithRandomScores(amount)
        jest.spyOn(recommendationRepository,"getAmountByScore").mockResolvedValueOnce(data)
        await recommendationService.getTop(amount)
        expect(recommendationRepository.getAmountByScore).toHaveBeenCalled()
    })   

})

describe("get random recommendations", ()=>{

    it("Should return random recommendations" , async ()=>{
        const data = await createRecomendationsWithRandomScores(10)
        jest.spyOn(recommendationRepository,"findAll").mockResolvedValueOnce(data)
        await recommendationService.getRandom()
        expect(recommendationRepository.getAmountByScore).toHaveBeenCalled()
    }) 
    
    it("Should not return random recommendations" , async ()=>{        
        jest.spyOn(recommendationRepository,"findAll").mockResolvedValueOnce([])
        const promise = recommendationService.getRandom()
        expect(promise).rejects.toEqual({ message: "",type: "not_found" })
    }) 

    it("Should return random recommendations with scores" , async ()=>{        
        const data = await createRecomendationsWithRandomScores(10)
        jest.spyOn(recommendationRepository,"findAll").mockResolvedValueOnce(data)
        await recommendationService.getRandom()
        expect(recommendationRepository.getAmountByScore).toHaveBeenCalled()
    })

})
 
afterAll(async () => {
    await prisma.$disconnect();
});

