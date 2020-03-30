/*!
 * 
 *   dsa-sdk v1.0.5
 *   https://github.com/instadapp/dsa-sdk
 * 
 *   Copyright (c) INSTADAPP LABS LLC 
 * 
 *   This source code is licensed under the MIT license found in the
 *   LICENSE file in the root directory of this source tree.
 * 
 */
!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.DSA=t():e.DSA=t()}(this,(function(){return function(e){var t={};function n(a){if(t[a])return t[a].exports;var s=t[a]={i:a,l:!1,exports:{}};return e[a].call(s.exports,s,s.exports,n),s.l=!0,s.exports}return n.m=e,n.c=t,n.d=function(e,t,a){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:a})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var a=Object.create(null);if(n.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var s in e)n.d(a,s,function(t){return e[t]}.bind(null,s));return a},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t,n){const a=n(1),s=n(2),{address:i,ABI:r}=n(3);e.exports=class{constructor(){this.address=i,this.ABI=r,this.helpers=new a,this.compound=new s}async build(e){var t=web3.currentProvider.selectedAddress;return e||(e={}),e.owner||(e.owner=t),e.version||(e.version=1),e.origin||(e.origin=i.genesis),(await new web3.eth.Contract(r.INDEX_CORE,i.core.index)).methods.build(e.owner,e.version,e.origin).send({from:t}).on("transactionHash",e=>(console.log(`txHash: ${e}`),e))}async count(){var e=new web3.eth.Contract(r.LIST_CORE,i.core.list);return await e.methods.accounts().call().then(e=>e)}async getAccounts(e){var t=new web3.eth.Contract(r.CORE_RESOLVER,i.resolver.core);return await t.methods.getOwnerDetails(e).call({from:i.genesis}).then(e=>{numberOfAccounts=e.IDs.length,accounts=Array(numberOfAccounts);for(var t=0;t<numberOfAccounts;t++)accounts[t]=[];return e.IDs.forEach((e,t)=>{accounts[t].id=e}),e.accounts.forEach((e,t)=>{accounts[t].account_id=e}),e.versions.forEach((e,t)=>{accounts[t].version=e}),accounts})}async getAuthentications(e){var t=new web3.eth.Contract(r.CORE_RESOLVER,i.resolver.core);return await t.methods.getIDOwners(e).call({from:i.genesis})}}},function(e,t){e.exports=class{cleanAddress(e){return e.slice(0,4)+"..."+e.slice(-4)}cleanTxn(e){return e.slice(0,6)+"..."+e.slice(-6)}cleanDecimal(e,t){var n=100;return t&&(n=10**t),(0,Math.floor)(+e*n)/n}cleanNumber(e){return 1e6<e?`${cleanDecimal(e/1e6).toLocaleString()} M`:1e4<e?`${cleanDecimal(e/1e3).toLocaleString()} K`:e?cleanDecimal(e).toLocaleString():"0.00"}bigNumInString(e){var t,n=Math.pow;1>Math.abs(e)?(t=parseInt(e.toString().split("e-")[1]))&&(e*=n(10,t-1),e="0."+Array(t).join("0")+e.toString().substring(2)):20<(t=parseInt(e.toString().split("+")[1]))&&(e/=n(10,t-=20),e+=Array(t+1).join("0"));return e}}},function(e,t){e.exports=class{name(){console.log("COMPOUND")}}},function(e,t,n){e.exports.address={genesis:"0x0000000000000000000000000000000000000000",core:{index:"0x2971AdFa57b20E5a416aE5a708A8655A9c74f723",list:"0x4c8a1BEb8a87765788946D6B19C6C6355194AbEb"},resolver:{core:"0xD6fB4fd8b595d0A1dE727C35fe6F1D4aE5B60F51"}},e.exports.ABI={INDEX_CORE:n(4),LIST_CORE:n(5),CORE_RESOLVER:n(6)}},function(e){e.exports=JSON.parse('[{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"sender","type":"address"},{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"account","type":"address"},{"indexed":true,"internalType":"address","name":"origin","type":"address"}],"name":"LogAccountCreated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"_newAccount","type":"address"},{"indexed":true,"internalType":"address","name":"_connectors","type":"address"},{"indexed":true,"internalType":"address","name":"_check","type":"address"}],"name":"LogNewAccount","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"accountVersion","type":"uint256"},{"indexed":true,"internalType":"address","name":"check","type":"address"}],"name":"LogNewCheck","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"master","type":"address"}],"name":"LogNewMaster","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"master","type":"address"}],"name":"LogUpdateMaster","type":"event"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"account","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_newAccount","type":"address"},{"internalType":"address","name":"_connectors","type":"address"},{"internalType":"address","name":"_check","type":"address"}],"name":"addNewAccount","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_owner","type":"address"},{"internalType":"uint256","name":"accountVersion","type":"uint256"},{"internalType":"address","name":"_origin","type":"address"}],"name":"build","outputs":[{"internalType":"address","name":"_account","type":"address"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_owner","type":"address"},{"internalType":"uint256","name":"accountVersion","type":"uint256"},{"internalType":"address[]","name":"_targets","type":"address[]"},{"internalType":"bytes[]","name":"_datas","type":"bytes[]"},{"internalType":"address","name":"_origin","type":"address"}],"name":"buildWithCast","outputs":[{"internalType":"address","name":"_account","type":"address"}],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"uint256","name":"accountVersion","type":"uint256"},{"internalType":"address","name":"_newCheck","type":"address"}],"name":"changeCheck","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_newMaster","type":"address"}],"name":"changeMaster","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"check","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"connectors","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"version","type":"uint256"},{"internalType":"address","name":"query","type":"address"}],"name":"isClone","outputs":[{"internalType":"bool","name":"result","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"list","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"master","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_master","type":"address"},{"internalType":"address","name":"_list","type":"address"},{"internalType":"address","name":"_account","type":"address"},{"internalType":"address","name":"_connectors","type":"address"}],"name":"setBasics","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"updateMaster","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"versionCount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}]')},function(e){e.exports=JSON.parse('[{"inputs":[{"internalType":"uint64","name":"","type":"uint64"}],"name":"accountAddr","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"accountID","outputs":[{"internalType":"uint64","name":"","type":"uint64"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint64","name":"","type":"uint64"}],"name":"accountLink","outputs":[{"internalType":"address","name":"first","type":"address"},{"internalType":"address","name":"last","type":"address"},{"internalType":"uint64","name":"count","type":"uint64"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint64","name":"","type":"uint64"},{"internalType":"address","name":"","type":"address"}],"name":"accountList","outputs":[{"internalType":"address","name":"prev","type":"address"},{"internalType":"address","name":"next","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"accounts","outputs":[{"internalType":"uint64","name":"","type":"uint64"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_owner","type":"address"}],"name":"addAuth","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_account","type":"address"}],"name":"init","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"instaIndex","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_owner","type":"address"}],"name":"removeAuth","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"userLink","outputs":[{"internalType":"uint64","name":"first","type":"uint64"},{"internalType":"uint64","name":"last","type":"uint64"},{"internalType":"uint64","name":"count","type":"uint64"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"uint64","name":"","type":"uint64"}],"name":"userList","outputs":[{"internalType":"uint64","name":"prev","type":"uint64"},{"internalType":"uint64","name":"next","type":"uint64"}],"stateMutability":"view","type":"function"}]')},function(e){e.exports=JSON.parse('[{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[],"name":"connectors","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint64","name":"id","type":"uint64"}],"name":"getAccount","outputs":[{"internalType":"address","name":"account","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"getAccountOwners","outputs":[{"internalType":"address[]","name":"","type":"address[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address[]","name":"accounts","type":"address[]"}],"name":"getAccountVersions","outputs":[{"internalType":"uint256[]","name":"","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getEnabledConnectores","outputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"address[]","name":"","type":"address[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"getID","outputs":[{"internalType":"uint256","name":"id","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"id","type":"uint256"}],"name":"getIDOwners","outputs":[{"internalType":"address[]","name":"","type":"address[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"getOwnerAccounts","outputs":[{"internalType":"address[]","name":"","type":"address[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"getOwnerDetails","outputs":[{"components":[{"internalType":"uint64[]","name":"IDs","type":"uint64[]"},{"internalType":"address[]","name":"accounts","type":"address[]"},{"internalType":"uint256[]","name":"versions","type":"uint256[]"}],"name":"","type":"tuple"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"getOwnerIDs","outputs":[{"internalType":"uint64[]","name":"","type":"uint64[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getStaticConnectores","outputs":[{"internalType":"address[]","name":"","type":"address[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"index","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"list","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"version","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}]')}])}));