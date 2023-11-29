const { expect } = require("chai");
const hre = require("hardhat");

describe("TodoContract", function () {
    it("Should deploy TodoCOntract and change status", async function () {
        const todo = await hre.ethers.deployContract("todo");
        await todo.waitForDeployment();
        
        await todo.createTodo("Eats");
        await todo.createTodo("cook");
        await todo.createTodo("fish");
        expect(await todo.todoId()).to.equal(3);

        const todoInfo = await todo.getTodo(1);
        expect(todoInfo[1]).to.equal("Eats");

        const statusBefore = await todo.checkTodoStatus(1);
        expect(statusBefore).to.equal(false);

        await todo.changeTodoStatus(1);
        const statusAfter = await todo.checkTodoStatus(1);
        expect(statusAfter).to.equal(true);

        await todo.deleteTodo(1);
        expect(await todo.todoId()).to.equal(2);
        try {
            await todo.getTodo(1);
        } catch (error) {
            expect(error.message).to.include("Item does not exist");
        }
    });

});