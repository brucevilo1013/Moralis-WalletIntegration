const serverUrl = 'https://hx9knjepxmfk.usemoralis.com:2053/server'
const appId = "PjagqHmJQZGW44ans3RjzciwRvCsvLxArHQObPh2";
Moralis.start({ serverUrl: serverUrl, appId: appId });

let user = Moralis.User.current();


const options = {
    address: '0x495f947276749Ce646f68AC8c248420045cb7b5e',
    // token_id: '22397481368411838953467959367242755130058808779998063417175655776175905570817',
    // token_id: '22397481368411838953467959367242755130058808779998063417175655773976882315265',
    // token_id: '22397481368411838953467959367242755130058808779998063417175655766280300920833',
    // token_id: '22397481368411838953467959367242755130058808779998063417175655769578835804161',
    token_id: '22397481368411838953467959367242755130058808779998063417175655772877370687489',
    chain: 'eth'
};

async function mmLogin() {
    if (typeof window.ethereum === 'undefined') {
        console.log('MetaMask is uninstalled!');
        $('.alert').show();
        return false;
    }

    user = await Moralis.authenticate({
        signingMessage: "Log in using Moralis",
    })
        .then(async (user) => {
            $('#btn-connect').hide();
            $('#walletModal').hide();
            console.log("logged in user with metamask:", user);
            console.log(user.get("ethAddress"));

            Moralis.Web3API.token.getTokenIdOwners(options).then((owners) => {
                console.log('user nfts', owners)
               if (owners?.result?.length) {
                   const owner = owners?.result.filter((owner) => owner?.owner_of === user?.get("ethAddress"));
                   if (owner.length) {
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

            Moralis.Web3API.token.getTokenIdOwners(options).then((owners) => {
                if (owners?.result?.length) {
                    const owner = owners?.result.filter((owner) => owner?.owner_of?.toString() === user?.get("ethAddress")?.toString());
                    if (owner.length) {
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