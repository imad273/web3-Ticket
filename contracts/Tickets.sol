// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.11;

uint constant TOTAL_TICKET = 10;

contract Tickets {
   struct Ticket {
      uint Price;
      address Owner;
      bool Sold;
   }

   Ticket[TOTAL_TICKET] public tickets;

   constructor() {
      for(uint i = 0; i < TOTAL_TICKET; i++) {
         tickets[i].Price = 1e17;
         tickets[i].Owner = address(0x0);
         tickets[i].Sold = false;
      }
   }

   function buyTicket(uint _index) external payable {
      require(_index < TOTAL_TICKET && _index >= 0);
      require(tickets[_index].Owner == address(0x0));
      require(msg.value >= tickets[_index].Price);
      require(tickets[_index].Sold == false);

      tickets[_index].Owner = msg.sender;
      tickets[_index].Sold = true;
   }

   function showTicket() public view returns(Ticket memory) {
      return tickets[0];
   }
}