pragma solidity ^0.4.17;

contract web2decentorage {
    address public decentorage;
    address public webUser;
    address[] public storageNodes;
    uint userValue;  //this value in wei
    uint storageNodeValue;
    
    function web2decentorage(uint UV, uint SNV) public {
        userValue = UV;
        storageNodeValue = SNV;
        decentorage = msg.sender;   //decentorage ID that will manage this contract
    }
    
    function getPaidByUser() public payable {
        require(msg.value > userValue);    //here we should put the amount of money the user shoudl pay
        webUser = msg.sender;           //save the user ID
    }
    
    function addStorageNode(address A) public restricted {
        storageNodes.push(A);
    } 
    
    function payStorageNode(address A) public restricted {
        for(uint i=0; i<storageNodes.length; i++){
            if(storageNodes[i] == A){
                storageNodes[i].transfer(storageNodeValue);   //amount of money should be sent to a storage node
            }
        }
    }

    function getStorageNodes() public restricted returns(address[]) {
      return storageNodes;
    }

    function getDecentorage() public view returns(address) {
      return decentorage;
    }

    function getwebUser() public restricted view returns(address) {
      return webUser;
    }

    function getBalance() public restricted returns(uint) {
        return this.balance;
    }
    
    modifier restricted() {
        require(msg.sender == decentorage);
        _;
    }
}