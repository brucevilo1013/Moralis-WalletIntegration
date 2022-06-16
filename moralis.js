const serverUrl = 'https://hx9knjepxmfk.usemoralis.com:2053/server'
const appId = "PjagqHmJQZGW44ans3RjzciwRvCsvLxArHQObPh2";
Moralis.start({ serverUrl: serverUrl, appId: appId });
async function mmLogin() {
    let user = Moralis.User.current();
    user = await Moralis.authenticate({
        signingMessage: "Log in using Moralis",
    })
        .then(function (user) {
            // const options = {
            //     chain: "eth",
            //     address: "0x22397481368411838953467959367242755130058808779998063417175655769578835804161",
            // };
            // Moralis.Web3API.account.getNFTs(options).then((nft) => {
            //     console.log('nft with mm', nft)
            //
            // });
            $('#btn-connect').hide();
            $('#btn-edit').show();
            console.log("logged in user with metamask:", user);
            console.log(user.get("ethAddress"));
        })
        .catch(function (error) {
            $('#btn-connect').show();
            $('#btn-edit').hide();
            console.log(error);
        });
}
document.getElementById("btn-mm").onclick = mmLogin;

async function wcLogin() {
    let user = Moralis.User.current();
    user = Moralis.authenticate({ provider: "walletconnect" })
        .then(function (user) {
            $('#btn-connect').hide();
            $('#btn-edit').show();
            console.log("logged in user with wallet connect:", user);
            console.log(user.get("ethAddress"));
        })
        .catch(function (error) {
            $('#btn-connect').show();
            $('#btn-edit').hide();
            console.log(error);
        });
}
document.getElementById("btn-wc").onclick = wcLogin;