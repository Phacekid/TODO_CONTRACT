// SPDX-License-Identifier: MIT
// author: Phace
pragma solidity ^0.8.19;

contract todo {
    uint8 public todoId = 0;

    struct Tasks {
        uint8 id;
        string content;
        bool status;
    }

    mapping (uint8 => Tasks) public task;

    modifier itemExist(uint8 _id) {
        require(_id > 0, "id has to be greater than 0!");
        require(bytes(task[_id].content).length > 0, "Item does not exist");
        _;
    }

    function createTodo (string memory _content) public {
        todoId ++;
        task[todoId] = Tasks(todoId, _content, false);
    }

    function getTodo (uint8 _id) public view itemExist(_id) returns (uint8, string memory, bool) {
        return (task[_id].id, task[_id].content, task[_id].status);
    }

    function checkTodoStatus(uint8 _id) public view itemExist(_id) returns (bool) {
        return task[_id].status;
    }

    function changeTodoStatus(uint8 _id) public itemExist(_id) {
        task[_id].status = !task[_id].status;
    }

    function deleteTodo(uint8 _id) public itemExist(_id){
        todoId --;
        delete task[_id];
    }
}