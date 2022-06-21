const serverUrl = 'https://hx9knjepxmfk.usemoralis.com:2053/server'
const appId = "PjagqHmJQZGW44ans3RjzciwRvCsvLxArHQObPh2";
Moralis.start({ serverUrl: serverUrl, appId: appId });

const nftId = '22397481368411838953467959367242755130058808779998063417175655776175905570817';
let user = Moralis.User.current();

async function mmLogin() {
    alert(`eth window state ${typeof window.ethereum}`)
    if (typeof window.ethereum === 'undefined') {
        console.log('MetaMask is uninstalled!');
        alert('no install mm')
        $('.alert').show();
        return false;
    }

    alert(`user - state -${JSON.stringify(user)}`)

    user = await Moralis.authenticate({
        signingMessage: "Log in using Moralis",
    })
        .then(function (user) {
            alert(`login success - ${JSON.stringify(user)}`)
            $('#btn-connect').hide();
            $('#walletModal').hide();
            console.log("logged in user with metamask:", user);
            console.log(user.get("ethAddress"));

            // const options = {
            //     chain: "eth",
            //     address: "0x495f947276749Ce646f68AC8c248420045cb7b5e",
            // };
            // Moralis.Web3API.account.getNFTs(options).then((nft) => {
            //     console.log('nft with mm', nft)
            // });

            // Moralis.Web3API.account.getNFTs().then((userEthNFTs) => {
            //     console.log('user nfts', userEthNFTs)
            //    if (userEthNFTs.result.length) {
            //        const nfts = userEthNFTs.result.filter((nft) => nft?.token_id === nftId);
            //        if (nfts.length) {
            //            $('#btn-edit').show();
            //        }
            //    }
            // });
        })
        .catch(function (error) {
            alert(`catch - error${JSON.stringify(error)}`)
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