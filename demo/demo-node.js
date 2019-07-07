/*
* @Author: colxi
* @Date:   2018-09-22 01:07:59
* @Last Modified by:   colxi
* @Last Modified time: 2018-09-26 22:11:38
*/
const Timer = require('../src/main.js');


new Timer(200).repeat(10).action( t=>console.log( 'cycle',t.currentCycle,'of',t.cycleLimit) ).start()



