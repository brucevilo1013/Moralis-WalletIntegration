const serverUrl = 'https://hx9knjepxmfk.usemoralis.com:2053/server'
const appId = "PjagqHmJQZGW44ans3RjzciwRvCsvLxArHQObPh2";
Moralis.start({ serverUrl: serverUrl, appId: appId });

const nftId = '22397481368411838953467959367242755130058808779998063417175655776175905570817';
let user = Moralis.User.current();

async function mmLogin() {
    if (typeof window.ethereum === 'undefined') {
        console.log('MetaMask is uninstalled!');
        $('.alert').show();
        return false;
    }

    user = await Moralis.authenticate({
        signingMessage: "Log in using Moralis",
    })
        .then(function (user) {
            $('#btn-connect').hide();
            $('#walletModal').hide();
            console.log("logged in user with metamask:", user);
            console.log(user.get("ethAddress"));

            // const options = {
            //     chain: "eth",
            //     address: "0x9B3011d6Db7512F5C379d83F73a3962A950385dA",
            // };
            // Moralis.Web3API.account.getNFTs(options).then((nft) => {
            //     console.log('nft with mm', nft)
            // });

            Moralis.Web3API.account.getNFTs().then((userEthNFTs) => {
                console.log('user nfts', userEthNFTs)
               if (userEthNFTs.result.length) {
                   const nfts = userEthNFTs.result.filter((nft) => nft?.token_id === nftId);
                   if (nfts.length) {
                       $('#btn-edit').show();
                   }
               }
            });
        })
        .catch(function (error) {
            $('#btn-connect').show();
            $('#btn-edit').hide();
            console.log(error);
        });
}
document.getElementById("btn-mm").onclick = mmLogin;

async function wcLogin() {
    user = Moralis.authenticate({ provider: "walletconnect" })
        .then(function (user) {
            console.log("logged in user with wallet connect:", user);
            console.log(user.get("ethAddress"));
            $('#btn-connect').hide();
            $('#walletModal').hide();

            Moralis.Web3API.account.getNFTs().then((userEthNFTs) => {
                if (userEthNFTs.result.length) {
                    const nfts = userEthNFTs.result.filter((nft) => nft?.token_id === nftId);
                    if (nfts.length) {
                        $('#btn-edit').show();
                    }
                }
            });
        })
        .catch(function (error) {
            $('#btn-connect').show();
            $('#btn-edit').hide();
            console.log(error);
        });
}
document.getElementById("btn-wc").onclick = wcLogin;