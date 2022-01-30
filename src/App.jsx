import './App.css';
import { useState, useEffect } from 'react';
import Web3 from 'web3';
import HDWalletProvider from "@truffle/hdwallet-provider";
const mnemonicPhrase = "solve donate immense tool disorder idea silver labor scene lobster pyramid truck"

function App() {

  const [MetaMask, setMetaMask] = useState(false);
  const [Account, setAccount] = useState(0);

  const contract_address = "0x74533D3E93947361f91966970b8EFc6505dC01C1";

  useEffect(async () => {
    const web3 = new Web3(Web3.givenProvider || "ws://localhost:7545");

    const accounts = await web3.eth.getAccounts();
    setAccount(accounts[0]);
  }, [Account])

  useEffect(() => {
    if (typeof web3 !== undefined) {
      if (typeof window.ethereum !== 'undefined') {
        setMetaMask(true);
        if (Account > 0) {
          getTickets();
        }
      } else {
        setMetaMask(false);
      }
    } else {
      console.log("web3 not supported in this browser")
    }
  }, [Account]);

  async function connectToMetamak() {
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    setAccount(accounts[0]);
  }

  async function getAbi() {
    var request = await fetch('./Ticket.json', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    var response = await request.json();
    return response;
  }

  const TOTAL_TICKET = 10;

  async function getTickets() {
    const provider = new HDWalletProvider({
      mnemonic: mnemonicPhrase,
      providerOrUrl: "https://ropsten.infura.io/v3/9e86c35201ef48a8871aef1abecdbe9d"
    });

    //const web3 = new Web3("ws://localhost:7545");
    const web3 = new Web3(Web3.givenProvider);

    const contractJSON = await getAbi();

    const address = contract_address;

    const contract = new web3.eth.Contract(contractJSON.abi, address);

    var tickets = document.getElementById("tickets");

    const EMPTY_ADDRESS = "0x0000000000000000000000000000000000000000";

    for (var i = 0; i < TOTAL_TICKET; i++) {
      const ticket = await contract.methods.tickets(i).call();

      if (ticket.Owner === EMPTY_ADDRESS) {
        var div = document.createElement("div");
        div.className = "flex flex-col m-3 bg-white text-black rounded-xl";
        div.innerHTML = `
          <span class='px-8 py-3 text-center font-semibold text-xl'>Ticket</span>
          <p class='px-8 py-3 text-center'>${ticket.Price / 1e18} ETH</p>
          <button data=${i} class='buy-btn p-2 bg-[#ff0074] text-white rounded-b-xl'>BUY</button>
        `;

        tickets.appendChild(div);
      }
    }

    var buy_btn = document.getElementsByClassName("buy-btn");

    for (var i = 0; i < buy_btn.length; i++) {
      buy_btn[i].addEventListener("click", (e) => {
        submitVote(e.target.attributes.data.value);
      })
    }
  }

  async function submitVote(index) {
    const provider = new HDWalletProvider({
      mnemonic: mnemonicPhrase,
      providerOrUrl: "https://ropsten.infura.io/v3/9e86c35201ef48a8871aef1abecdbe9d"
    });

    //const web3 = new Web3("ws://localhost:7545");
    const web3 = new Web3(Web3.givenProvider);

    const contractJSON = await getAbi();

    const address = contract_address;

    const contract = new web3.eth.Contract(contractJSON.abi, address);

    const vote = await contract.methods.buyTicket(index, "0x4df850701594Da859f02164847C88fA07c00b33C").send({ from: Account, value: 1e17 });
    
    console.log(vote);
  }

  return (
    <div className='bg-gray-800 text-white h-full md:h-screen p-4'>
      <h1 className='text-center font-bold text-3xl'>Welcome To Your DAPP Application</h1>
      <h1 className='text-center text-2xl'>Voting System</h1>

      <div className='mt-10 flex flex-col items-center'>
        {MetaMask ?
          // if metamask installed
          Account ?
            Account :
            <button onClick={() => { connectToMetamak() }} className='bg-[#FF4235] font-semibold duration-300 m-2 px-3 py-1.5 rounded-full hover:bg-[#DB262A]' id='btn'>
              Connect To MetaMask
            </button>

          // if metamask not installed
          : <a href='https://metamask.io/' target='_blank' className='bg-[#FF4235] font-semibold duration-300 m-2 px-3 py-1.5 rounded-full hover:bg-[#DB262A] cursor-pointer' id='btn'>
            Install MeatMask
          </a>
        }

        <div className='flex flex-wrap justify-center' id='tickets'>

        </div>
      </div>
    </div>
  );
}

export default App;
