/*
* @Author: colxi
* @Date:   2018-09-22 01:07:59
* @Last Modified by:   colxi
* @Last Modified time: 2018-09-22 15:42:11
*/
const Timer = require('../src/better-timer.js');



new Timer(100).action( t=>console.log( 'cycle',t.cycle,'of',t.cycles) ).start()



