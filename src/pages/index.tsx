import styles from '../styles/Home.module.css'
import { useEffect, useState } from 'react'
import * as gariSdk from "gari";
import axios from "axios";


export default function Home() {
  const [userId, setUserid]= useState(null);
  const [wallet, setWallet] = useState(null);


  const gariClientId = "d8817deb-dceb-40a4-a890-21f0286c8fba";
  let token = ""

  //Initialise SDK
  useEffect(() => {
    console.log(`gariSdk version ${gariSdk.packageVersion()}`);
    //let environment = 'devnet'; // to use mainnet pass "mainnet"
    let configDetails = {
      gariClientId,
      secretKey: undefined,
      web3authClientId: "",
      verifierName: "",
      verifierDomain: "",
      environment: "devnet",
    };
    console.log("working");
    const a = gariSdk.sdkInitialize(configDetails);
    console.log(a);
   }, []);


   // Get Token

   // 1. getToken function

   async function getToken(userId) {
    const loginResponse = await axios.get(
      `https://demo-gari-sdk.vercel.app/api/login?userId=${userId}`
    );
    console.log("jwtToken", loginResponse.data);

    return loginResponse.data;
   }

    // 2. Need to login

   async function login() {
    token = await getToken(userId);
    console.log(token);
   }

 // Get wallet

 async function getWallet() {
  try {
    const init = gariSdk.sdkInitialize({ gariClientId });
    console.log(init);

    const walletResult = await gariSdk.createWalletOrGetWallet(token);
    setWallet(walletResult);

    console.log(walletResult);
  }catch(error) {
    console.log(error);
  }
 }

  // frontend

  return (
    <div className={styles.container}>
      <input
        label="UserId"
        variant="outlined"
        name="userId"
        margin="dense"
        required
        fullWidth
        type="number"
        onChange={(e) => setUserid(e.target.value)}
      />
      <button onClick={login}>Login</button>
      <div>
        <p>Text details</p>
      <button onClick={getWallet}>get wallet details</button>
      </div>

      <div>
        <p>airdrop</p>
        {/* <button onClick={airdrop}>airdrop</button> */}
      </div>
    </div>
  );



  
}
