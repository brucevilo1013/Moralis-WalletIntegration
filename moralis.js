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

function mmLogin() {
    if (window.ethereum) {
        console.log('11111111111111111111')
        handleEthereum();
    } else {
        console.log('22222222222222222222')
        window.addEventListener('ethereum#initialized', handleEthereum, {
            once: true,
        });

        // If the event is not dispatched by the end of the timeout,
        // the user probably doesn't have MetaMask installed.
        setTimeout(handleEthereum, 3000); // 3 seconds
    }

    function handleEthereum() {
        const { ethereum } = window;
        console.log('333333333333333333')
        if (ethereum && ethereum?.isMetaMask) {
            console.log('Ethereum successfully detected!');
            // Access the decentralized web!
            Moralis.authenticate({
                signingMessage: "Log in using Moralis",
            })
                .then((user) => {
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
                    console.log('44444444444444444444', error);
                });
        } else {
            // Mobile
            console.log('5555555555555555555555555555555')
            if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
                console.log('66666666666666666666666')
                // window.open('https://metamask.app.link/dapp/brucevilo1013.github.io/Moralis-WalletIntegration/');
                let newTab = window.open();
                newTab.location.href = 'dapp://brucevilo1013.github.io/Moralis-WalletIntegration/';

            } else {
                console.log('Please install MetaMask!');
                console.log('MetaMask is uninstalled!');
                $('.alert').show();
                return false;
            }
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