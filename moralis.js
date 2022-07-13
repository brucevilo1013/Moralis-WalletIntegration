const serverUrl = 'https://zsw4ghttvpk4.usemoralis.com:2053/server'
const appId = "jtUSAKFakotlqpGzi4hBHJBV8DBDkDFAnDqdn5uQ";
Moralis.start({ serverUrl: serverUrl, appId: appId });
const options = {
    address: '0x495f947276749Ce646f68AC8c248420045cb7b5e',
    // token_id: '22397481368411838953467959367242755130058808779998063417175655776175905570817',
    // token_id: '22397481368411838953467959367242755130058808779998063417175655773976882315265',
    // token_id: '22397481368411838953467959367242755130058808779998063417175655766280300920833',
    // token_id: '22397481368411838953467959367242755130058808779998063417175655769578835804161',
    token_id: '22397481368411838953467959367242755130058808779998063417175655772877370687489',
    chain: 'eth'
};

let loggedInUser = Moralis.User.current();


if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
    if (window.ethereum && window.ethereum?.isMetaMask) {
        mmLogin()
    }
}

function mmLogin() {
    if (window.ethereum) {
        handleEthereum();
    } else {
        // Mobile
        if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
            window.open('dapp://brucevilo1013.github.io/Moralis-WalletIntegration/');
        } else {
            console.log('Please install MetaMask!');
            console.log('MetaMask is uninstalled!');
            $('.alert').show();
            return false;
        }
    }

    function handleEthereum() {
        const { ethereum } = window;
        if (ethereum && ethereum?.isMetaMask) {
            console.log('Ethereum successfully detected!');
            // Access the decentralized web!
            Moralis.authenticate()
                .then((user) => {
                    $('#btn-connect').hide();
                    $('#walletModal').hide();
                    console.log("logged in user with metamask:", user);
                    console.log(user.get("ethAddress"));
                    loggedInUser = user;
                    $('#login-result').show();
                    Moralis.Web3API.token.getTokenIdOwners(options).then((owners) => {
                        if (owners?.result?.length) {
                            const owner = owners?.result.filter((owner) => owner?.owner_of?.toString() === loggedInUser?.get("ethAddress")?.toString());
                            if (owner.length) {
                                $('#btn-edit').show();
                            }
                        }
                    });
                })
                .catch(function (error) {
                    $('#btn-connect').show();
                    $('#login-result').hide();
                });
        }
    }
}
document.getElementById("btn-mm").onclick = mmLogin;


function wcLogin() {
    Moralis.authenticate({ provider: "walletconnect" })
        .then(function (user) {
            console.log("logged in user with wallet connect:", user);
            console.log(user.get("ethAddress"));
            $('#btn-connect').hide();
            $('#walletModal').hide();
            loggedInUser = user;
            $('#login-result').show();
            Moralis.Web3API.token.getTokenIdOwners(options).then((owners) => {
                if (owners?.result?.length) {
                    const owner = owners?.result.filter((owner) => owner?.owner_of?.toString() === loggedInUser?.get("ethAddress")?.toString());
                    if (owner.length) {
                        $('#btn-edit').show();
                    }
                }
            });
        })
        .catch(function (error) {
            $('#btn-connect').show();
            $('#login-result').hide();
            console.log(error);
        });
}
document.getElementById("btn-wc").onclick = wcLogin;


function checkOwnerByNftId(nftOptions = options) {
    Moralis.Web3API.token.getTokenIdOwners(nftOptions).then((owners) => {
        if (owners?.result?.length) {
            const owner = owners?.result.filter((owner) => owner?.owner_of?.toString() === loggedInUser?.get("ethAddress")?.toString());
            if (owner.length) {
                $('#login-result').text('True');
            } else {
                $('#login-result').text('False');
            }
        } else {
            $('#login-result').text('False');
        }
    });
}