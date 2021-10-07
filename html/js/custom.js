const mainnetContract = '0x9bcEB89487789FFA0e4974291066366CDF4411eA';
const ticketPrice = 0.1;
var Web3;
let isConnected;
const mainnetAbi = [
  {inputs: [], stateMutability: 'nonpayable', type: 'constructor'},
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
      {internalType: 'uint256', name: 'newLotteryTicketPrice', type: 'uint256'},
    ],
    name: 'DrawLotteryWinner',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'LotteryParticipants',
    outputs: [{internalType: 'uint256', name: '', type: 'uint256'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{internalType: 'uint256', name: 'TicketID', type: 'uint256'}],
    name: 'getLotteryTicketHolder',
    outputs: [{internalType: 'address', name: '', type: 'address'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{internalType: 'address', name: 'account', type: 'address'}],
    name: 'getTicketCount',
    outputs: [{internalType: 'uint256', name: '', type: 'uint256'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'lotteryTicketPrice',
    outputs: [{internalType: 'uint256', name: '', type: 'uint256'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'owner',
    outputs: [{internalType: 'address', name: '', type: 'address'}],
    stateMutability: 'view',
    type: 'function',
  },
];

$ (function () {
  'use strict';
  // for navbar background color when scrolling
  $ (window).scroll (function () {
    var $scrolling = $ (this).scrollTop ();
    var bc2top = $ ('#back-top-btn');
    var stickytop = $ ('.sticky-top');
    if ($scrolling >= 10) {
      stickytop.addClass ('navcss');
    } else {
      stickytop.removeClass ('navcss');
    }
    if ($scrolling > 150) {
      bc2top.fadeIn (1000);
    } else {
      bc2top.fadeOut (1000);
    }
  });

  $ ('.full_nav .nav > li > .more-less').on ('click', function () {
    $ ('.full_nav .nav').toggleClass ('tog-nav');
    $ ('.full_nav .nav').toggleClass ('fa-time');
  });

  //animation scroll js
  var nav = $ ('nav'), navOffset = nav.offset ().top, $window = $ (window);
  /* navOffset ends */

  var html_body = $ ('html, body');
  $ ('nav a').on ('click', function () {
    if (
      location.pathname.replace (/^\//, '') ===
        this.pathname.replace (/^\//, '') &&
      location.hostname === this.hostname
    ) {
      var target = $ (this.hash);
      target = target.length
        ? target
        : $ ('[name=' + this.hash.slice (1) + ']');
      if (target.length) {
        html_body.animate (
          {
            scrollTop: target.offset ().top - 80,
          },
          1000
        );
        return false;
      }
    }
  });

  // navbar js ends here

  // this is for back to top js
  var bc2top = $ ('#back-top-btn');
  bc2top.on ('click', function () {
    html_body.animate (
      {
        scrollTop: 0,
      },
      1300
    );
  });

  // Closes responsive menu when a scroll link is clicked
  $ ('.nav-link').on ('click', function () {
    $ ('.navbar-collapse').collapse ('hide');
  });

  /* -------------------------------------
	          Running slick js				
	 	-------------------------------------- */
  $ ('.score-slick').slick ({
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
  });

  /* -------------------------------------
             Count-down js			
    	-------------------------------------- */

  $ ('.count-down').countdown ('2030/08/11', function (event) {
    $ (this).html (event.strftime ('%H'));
  });
  $ ('.count-down2').countdown ('2030/08/01', function (event) {
    $ (this).html (event.strftime ('%M'));
  });

  $ ('.count-down3').countdown ('2030/11/22', function (event) {
    $ (this).html (event.strftime ('%S'));
  });

  /* -------------------------------------
	          youtube video js start here			
	 	-------------------------------------- */
  jQuery ('a.bla-1').YouTubePopUp ({
    autoplay: 0,
  }); // Disable autoplay

  /* -------------------------------------
	          Preloader				
	 	-------------------------------------- */
  $ ('.preloader').delay (2500).fadeOut (1000);
});

const getTicketPrice = async () => {
  await mainnetAbi.buyLottery
}
const onClickLogin = () => {
  alert (
    "Our Team is working on getting user based authentication setup so users dont have to work with wallets and platform itself will handle individual user's portfolio."
  );
};

const onClickApp = () => {
  alert (
    'We have kickstarted the App development for Lucky Pig Casino. Timelines for completion will be shared soon.'
  );
};
window.onload = async () => {
  let element = document.getElementById ('connectWallet');
  const result = await this.getAccounts ();
  if (Array.isArray (result) && result.length > 0) {
    element.innerHTML = `Wallet - ...${result[0].substring (result[0].length - 7)}`;
    document.getElementById (
      'connectWallet-mobile'
    ).innerHTML = `Wallet - ...${result[0].substring (result[0].length - 7)}`;

    isConnected = true;
  }
};
async function getAccounts () {
  try {
    let acc = await window.ethereum.request ({
      method: 'eth_requestAccounts',
    });

    return acc;
  } catch (e) {
    return [];
  }
}
async function connectMetamask () {
  if (window.ethereum) {
    try {
      const result = await this.getAccounts ();
      if (Array.isArray (result) && result.length > 0) {
        isConnected = true;
        let acc = result[0];
        document.getElementById (
          'connectWallet'
        ).innerHTML = `Wallet - ...${result[0].substring (result[0].length - 7)}`;
        document.getElementById (
          'connectWallet-mobile'
        ).innerHTML = `Wallet - ...${result[0].substring (result[0].length - 7)}`;
        return acc;
      } else {
        return false;
      }
    } catch (err) {
      return false;
    }
  } else {
    return false;
  }
}
async function buyLottery() {
  let ticketsToBuy = document.getElementById('input-lottery').value;
  var web3 = new Web3(Web3.givenProvider);
  window.contract = await new web3.eth.Contract(mainnetAbi, mainnetContract);
  const amountToBuy = await window.contract.methods.lotteryTicketPrice().call() * parseInt(ticketsToBuy, 10)
  if (amountToBuy) {
    const transactionParameters = {
      to: mainnetContract,
      from: (await this.getAccounts())[0],
      value: bigInt(amountToBuy).toString(16),
      data: '0xc53c9d72',
    };
    try {
      await window.ethereum.request({
        method: 'eth_sendTransaction',
        params: [transactionParameters],
      });
    } catch (error) {
      console.log(error);
    }
  }
}
