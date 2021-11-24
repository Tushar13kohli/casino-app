const mainnetContract = '0x9bcEB89487789FFA0e4974291066366CDF4411eA'
const ticketPrice = 0.1

/* WEB 3  STARTS*/
var Web3
let isConnected
const mainnetAbi = [
  { inputs: [], stateMutability: 'nonpayable', type: 'constructor' },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'FirstTicketID',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'LastTicketID',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'account',
        type: 'address',
      },
    ],
    name: 'OnBuyLotteryTickets',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'winner',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
    ],
    name: 'OnDrawLotteryWinner',
    type: 'event',
  },
  {
    inputs: [],
    name: 'BuyLotteryTickets',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'newLotteryTicketPrice',
        type: 'uint256',
      },
    ],
    name: 'DrawLotteryWinner',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'LotteryParticipants',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint256', name: 'TicketID', type: 'uint256' }],
    name: 'getLotteryTicketHolder',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: 'account', type: 'address' }],
    name: 'getTicketCount',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'lotteryTicketPrice',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'owner',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
]
/* WEB 3  ENDS*/

/* BACKEND STARTS */
const baseUrl = 'http://localhost:3001'
const urls = {
  profile: `${baseUrl}/user/info`,
  signupUser: `${baseUrl}/user/signup`,
  loginUser: `${baseUrl}/user/login`,
  ticket: `${baseUrl}/ticket`,
}

/* BACKEND ENDS */

/* UTILS STARTS */
const getElement = (id) => {
  return document.getElementById(id)
}
const getElementValue = (id) => {
  return document.getElementById(id) && document.getElementById(id).value
}
const getAuthToken = () => {
  return localStorage.getItem('auth_token')
}
const writeToLocalStorage = (key, value) => {
  localStorage.setItem(key, value)
}
const readFromLocalStorage = (key) => {
  return localStorage.getItem(key)
}
/* UTILS ENDS */

$(function () {
  'use strict'
  // for navbar background color when scrolling
  $(window).scroll(function () {
    var $scrolling = $(this).scrollTop()
    var bc2top = $('#back-top-btn')
    var stickytop = $('.sticky-top')
    if ($scrolling >= 10) {
      stickytop.addClass('navcss')
    } else {
      stickytop.removeClass('navcss')
    }
    if ($scrolling > 150) {
      bc2top.fadeIn(1000)
    } else {
      bc2top.fadeOut(1000)
    }
  })

  $('.full_nav .nav > li > .more-less').on('click', function () {
    $('.full_nav .nav').toggleClass('tog-nav')
    $('.full_nav .nav').toggleClass('fa-time')
  })

  //animation scroll js
  var nav = $('nav'),
    navOffset = nav.offset().top,
    $window = $(window)
  /* navOffset ends */

  var html_body = $('html, body')
  $('nav a').on('click', function () {
    if (
      location.pathname.replace(/^\//, '') ===
        this.pathname.replace(/^\//, '') &&
      location.hostname === this.hostname
    ) {
      var target = $(this.hash)
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']')
      if (target.length) {
        html_body.animate(
          {
            scrollTop: target.offset().top - 80,
          },
          1000,
        )
        return false
      }
    }
  })

  // navbar js ends here

  // this is for back to top js
  var bc2top = $('#back-top-btn')
  bc2top.on('click', function () {
    html_body.animate(
      {
        scrollTop: 0,
      },
      1300,
    )
  })

  // Closes responsive menu when a scroll link is clicked
  $('.nav-link').on('click', function () {
    $('.navbar-collapse').collapse('hide')
  })

  /* -------------------------------------
	          Running slick js				
	 	-------------------------------------- */
  $('.score-slick').slick({
    infinite: true,
    slidesToShow: 7,
    slidesToScroll: 1,
    autoplay: false,
    vertical: true,
    swipeToSlide: true,
    verticalSwiping: true,
    autoplaySpeed: 2000,
    arrows: false,
    responsive: [
      {
        breakpoint: 1199,
        settings: {
          slidesToShow: 6,
        },
      },
      {
        breakpoint: 990,
        settings: {
          slidesToShow: 6,
        },
      },
    ],
  })

  /* -------------------------------------
             Count-down js			
    	-------------------------------------- */

  $('.count-down').countdown('2030/08/11', function (event) {
    $(this).html(event.strftime('%H'))
  })
  $('.count-down2').countdown('2030/08/01', function (event) {
    $(this).html(event.strftime('%M'))
  })

  $('.count-down3').countdown('2030/11/22', function (event) {
    $(this).html(event.strftime('%S'))
  })

  /* -------------------------------------
	          youtube video js start here			
	 	-------------------------------------- */
  jQuery('a.bla-1').YouTubePopUp({
    autoplay: 0,
  }) // Disable autoplay

  /* -------------------------------------
	          Preloader				
	 	-------------------------------------- */
  $('.preloader').delay(2500).fadeOut(1000)
})

const getTicketPrice = async () => {
  await mainnetAbi.buyLottery
}
const onClickLogin = () => {
  alert(
    "Our Team is working on getting user based authentication setup so users dont have to work with wallets and platform itself will handle individual user's portfolio.",
  )
}

const onClickApp = () => {
  alert(
    'We have kickstarted the App development for Lucky Pig Casino. Timelines for completion will be shared soon.',
  )
}

const fetchUserInfo = async () => {
  let connectedWallet = readFromLocalStorage('connectedWallet')
  if (!connectedWallet) return;
  let response = await fetch(
    `${urls.profile}?walletAddress=${connectedWallet}`,
    {
      headers: {
        App_ID: '619471ed70d643120b94cc7a',
      },
    },
  )

  if (response && response.status === 404) {
    writeToLocalStorage('doesUserExist', false)
  }
  if (response && response.status === 200) {
    let res = await response.json()
    writeToLocalStorage('doesUserExist', true)
    writeToLocalStorage('connectedWallet', res.walletAddress)
  }
  return response
}

const onClickSubmitForm = (event) => {
  event.preventDefault()
  const passwordValue = getElementValue('passwordField')
  if (!passwordValue) {
    alert('All fields are required.')
    return
  }
  let doesUserExist = JSON.parse(readFromLocalStorage('doesUserExist'))
  let callingUrl = doesUserExist ? urls.loginUser : urls.signupUser
  const wallet = readFromLocalStorage('connectedWallet')
  const password = getElement('passwordField').value
  const payload = {
    walletAddress: wallet,
    password,
  }
  fetch(`${callingUrl}`, {
    headers: {
      App_ID: '619471ed70d643120b94cc7a',
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify(payload),
  })
    .then(async (response) => {
      if (response && response.status === 200) {
        let res = await response.json()
        writeToLocalStorage('auth_token', res.token)
        window.location.href="/games.html"
        window.location.href = "./html/Unminified/index.html"
        window.location.reload()
      } else {
        alert(response.statusText)
      }
    })
    .catch((err) => {
      debugger
      console.log(err)
    })
}

const getLabel = () => {
  if (!window.location.pathname.includes("index.html")) return;
  const labelElement = getElement('label-banner')
  const submitButton = getElement('submit-button-form')
  const modalHeader = getElement('modal-label')
  const loginSuccessElement = getElement('login-text')
  const confirmElement = getElement('confirmPassword')
  const userExists = JSON.parse(readFromLocalStorage('doesUserExist'))
  const authToken = getAuthToken()
  const connectedWallet = readFromLocalStorage('connectedWallet')
  if (userExists ) {
    labelElement.innerHTML = 'Sign In'
    submitButton.innerHTML = 'Sign In'
    modalHeader.innerHTML = 'Sign In'
    labelElement.style.display='intial'
    confirmElement.style.display = 'none'
  } else {
    labelElement.innerHTML = 'Register'
    submitButton.innerHTML = 'Register'
    modalHeader.innerHTML = 'Register'
  }

  if (authToken) {
    labelElement.style.display = 'none'
    loginSuccessElement.innerHTML = 'You are successfully logged in'
    loginSuccessElement.style.display = 'block'
  }
  if (!connectedWallet) {
    labelElement.style.display = 'none'
  }
}

const validatePassword = (event) => {
  if (!window.location.pathname.includes("index.html")) return;
  const passwordValue = getElement('passwordField')
  const errorMessage = getElement('password-error')
  if (!event) {
    errorMessage.style.display = 'none'
    return true
  }
  if (passwordValue.value !== event.target.value) {
    errorMessage.style.display = 'block'
    return false
  }
  errorMessage.style.display = 'none'
  return true
}
const onLoadChanges = async () => {
  const isConnected = JSON.parse(readFromLocalStorage('isConnected'))
  const connectedWallet = readFromLocalStorage('connectedWallet')
  let element = document.getElementById('connectWallet')
  const inputWallet = getElement('wallet-address')
  if (isConnected) {
    element.innerHTML = `Wallet - ...${connectedWallet.substring(
      connectedWallet.length - 7,
    )}`
    document.getElementById(
      'connectWallet-mobile',
    ).innerHTML = `Wallet - ...${connectedWallet.substring(
      connectedWallet.length - 7,
    )}`
    writeToLocalStorage('connectedWallet', connectedWallet)
    writeToLocalStorage('isConnected', true)
    if(inputWallet) inputWallet.value = connectedWallet
  }
  window.ethereum.on('accountsChanged', (accounts) => {
    localStorage.clear()
    window.location.reload()
  })
  await fetchUserInfo()
  getLabel()
  validatePassword()
}
window.onload = () => {
  onLoadChanges()
}

async function getAccounts() {
  try {
    let acc = await window.ethereum.request({
      method: 'eth_requestAccounts',
    })

    return acc
  } catch (e) {
    return []
  }
}
async function buyLottery() {
  let ticketsToBuy = document.getElementById('input-lottery').value
  var web3 = new Web3(Web3.givenProvider)
  window.contract = await new web3.eth.Contract(mainnetAbi, mainnetContract)
  const amountToBuy =
    (await window.contract.methods.lotteryTicketPrice().call()) *
    parseInt(ticketsToBuy, 10)
  if (amountToBuy) {
    const transactionParameters = {
      to: mainnetContract,
      from: (await this.getAccounts())[0],
      value: amountToBuy,
      data: '0xc53c9d72',
    }
    try {
      await window.ethereum.request({
        method: 'eth_sendTransaction',
        params: [transactionParameters],
      })
    } catch (error) {
      console.log(error)
    }
  }
}

/**
 * WEB 3 Integration
 */

const Web3Modal = window.Web3Modal.default
const WalletConnectProvider = window.WalletConnectProvider.default
const Fortmatic = window.Fortmatic
const evmChains = window.evmChains

let web3Modal
let provider
let selectedAccount

/**
 * Setup the orchestra
 */
function init() {
  console.log('Initializing example')
  console.log('WalletConnectProvider is', WalletConnectProvider)
  console.log('Fortmatic is', Fortmatic)
  const providerOptions = {
    walletconnect: {
      package: WalletConnectProvider,
      options: {
        infuraId: '8043bb2cf99347b1bfadfb233c5325c0',
      },
    },
  }

  web3Modal = new Web3Modal({
    cacheProvider: false,
    providerOptions,
    disableInjectedProvider: false,
  })
}

const afterConnect = async (account) => {
  const inputWallet = getElement('wallet-address')
  inputWallet.value = account
  writeToLocalStorage('connectedWallet', account)
  writeToLocalStorage('isConnected', true)
  let res = await fetchUserInfo()
  debugger;
  getLabel()
}

async function fetchAccountData() {
  const web3 = new Web3(provider)
  console.log('Web3 instance is', web3)
  const accounts = await web3.eth.getAccounts()
  console.log('Got accounts', accounts)
  document.querySelector(
    '#connectWallet',
  ).textContent = `Wallet - ...${accounts[0].substring(accounts[0].length - 7)}`
  afterConnect(accounts[0])
}

async function refreshAccountData() {
  await fetchAccountData(provider)
}

async function onConnect() {
  try {
    provider = await web3Modal.connect()
  } catch (e) {
    console.log('Could not get a wallet connection', e)
    return
  }

  provider.on('connect', () => {
    console.log('Connected')
  })

  provider.on('accountsChanged', (accounts) => {
    alert('Reloading due to wallet change')
    localStorage.clear()
    window.location.reload()
  })

  provider.on('chainChanged', (chainId) => {
    fetchAccountData()
  })

  provider.on('networkChanged', (networkId) => {
    fetchAccountData()
  })

  await refreshAccountData()
}

window.addEventListener('load', async () => {
  init()
  document.querySelector('#connectWallet').addEventListener('click', onConnect)
})

const getBannerLabel = () => {
  const labelElement = getElement('label-banner')
  const submitButton = getElement('submit-button-form')
  const modalHeader = getElement('modal-label')
  const loginSuccessElement = getElement('login-text')
  const confirmElement = getElement('confirmPassword')
  const userExists = JSON.parse(readFromLocalStorage('doesUserExist'))
  const authToken = getAuthToken()
  const connectedWallet = readFromLocalStorage('connectedWallet')
  if (userExists) {
    labelElement.innerHTML = 'Sign In'
    submitButton.innerHTML = 'Sign In'
    modalHeader.innerHTML = 'Sign In'
    confirmElement.style.display = 'none'
  } else {
    labelElement.innerHTML = 'Register'
    submitButton.innerHTML = 'Register'
    modalHeader.innerHTML = 'Register'
  }

  if (authToken) {
    labelElement.style.display = 'none'
    loginSuccessElement.innerHTML = 'You are successfully logged in'
    loginSuccessElement.style.display = 'block'
  }
  if (!connectedWallet) {
    labelElement.style.display = 'none'
  } else {
    labelElement.style.display = 'initial'
  }
}
