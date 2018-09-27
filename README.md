
# advanced-timer
[![NoDependencies](https://img.shields.io/badge/dependencies-none-green.svg)](https://github.com/colxi/midi-parser-js)
[![Browser](https://img.shields.io/badge/browser-compatible-blue.svg)](https://github.com/colxi/midi-parser-js)
[![Node](https://img.shields.io/badge/node-compatible-brightgreen.svg)](https://www.npmjs.com/package/midi-parser-js)

Advanced timer with pause/resume/reset capabilites, conditional cycle execution, onComplete tasks scheduling, live timer delay manipullation, and much more.

```javascript
  // run myFunc 50 times every 1000ms
  let myTimer = new Timer( 1000 ).action( myFunc ).repeat( 50 ).start();
```
Some features:
- Chainable constructor 
- Able to Pause/resume/reset 
- Live delay change ( Timer.delay() I)
- Conditional cycles ( Timer.if() )
- On complete callbacks ( Timer.done() )
- Live iterations count change ( Timer.repeat() )
- Sync lost detection ( Timer.inSync )
- Cycle timestamp, deltaTime...
- **Tiny and Zero dependencies**

See it in action [here](https://colxi.github.io/advanced-timer/demo/demo-browser.html).
## Usage example

Create a timer that executes 50 times the callback every 1000ms (only when timer cycle remains in sync), and execute an onComplete callback when done.

```javascript
  let myTimer = new Timer( 1000 )
      .action( t=> console.log(t.currentCycle) )
      .if( t=> t.inSync )
      .repeat( 50 )
      .done( t=> console.log('completed!') )
      .start();
```

## Package distribution :
You can include this library using the CDN ...

```
<script src='https://cdn.jsdelivr.net/gh/colxi/advanced-timer/src/advanced-timer.min.js'></script>
```


Package can also be installed via NPM:

```
$ npm install advanced-timer --save
```

and is also available in Github :

```
https://github.com/colxi/advanced-timer
```

> In browser enviromt, the Timer Object is created in the window scope (`window.Timer`), in Node enviroments, must be imported and assigned using `require()`


## Timer Constructor

Creates a new timer instance.

```javascript
  let myTimer = new Timer( milliseconds );
```

- `milliseconds` : Integer representing the delay betwen cycles.

> **IMPORTANT**: The Constructor deesn't start the Timer, it only sets and returns the new timer Instance. You mus call the `start` method in order to start it.


## Timer prototype methods

####Timer.prototype.action
Sets the function to be executed in each timer cycle. **Is required to be able to start the timer.**
```javascript
    myTimer.action( callback );
```

- `callback`: Function to execute in each timer cycle. The function execution context will be binded to the timer (unless if declared as arrow functon), and will recieve a reference to the timer objct as the first argument.

> Note: Action callback can be changed any time.


#### Timer.prototype.start
Starts the timer. 

```javascript
  myTimer.start();
```
> Only a stopped timer (status 0) can be started. If it's paused (status 2)  must be resumed, if it's completed (status 3) must be reseted first.


#### Timer.prototype.stop
Stops the timer. ( Is the equivakent of `myTimer.pause().reset()` )

```javascript
   myTimer.stop();
```

#### Timer.prototype.pause
Pauses the timer.

```javascript
   myTimer.pause();
```
> Only a running timer (status 1) can be paused.

#### Timer.prototype.resume
Resumes the timer.

```javascript
    myTimer.resume();
```


> Only a paused timer (status 2) can be resumed.


####Timer.prototype.repeat
Sets the ammount of cycles before the timer stops. By default, if `repeat`is not executed, the timer will run infinitelly. 
```javascript
    myTimer.repeat( times );
```
- `times`:  Positive integer (or `Boolean`) representing the ammount of cycles to execute. If `false ` is set, a single cycle wil be executed. If set to `true`will run infinitelly.

> Note: Can be changed any time.


####Timer.prototype.delay
Sets the delay betwen each timer cycle

```javascript
    myTimer.delay( milliseconds );
```
- `milliseconds`: Integer representing ammount of milliseconds betwen each cycle callback.

> Note: Delay time can be changed any time.

####Timer.prototype.reset
Resets the timer and all its atributes.

```javascript
    myTimer.reset();
```


####Timer.prototype.if
Sets a callback to be executed before each cycle call. If returns true the cycle callback will be executed, but ommited if returns false.

```javascript
    myTimer.if( callback );
```
- `callback`: Function to be executed. Function recieves the timer reference as the first argument¡

> Note : Conditional callback can be disabled any time, by providing `false` as argument: `myTimer.if( false ) `


####Timer.prototype.done
Sets the callback to be executed when the timer reaches the las scheduled cycle.

```javascript
    myTimer.done( callback );
```
- `callback`: Function to be executed. Function recieves the timer reference as the first argument¡

####Timer.prototype.destroy
Destroys the timer and all its internal properties. Timer becomes unusable, and frees memory.
```javascript
    myTimer.destroy();
```


## Timer prototype properties

- `Timer.prototype.statusCode` : Integer representing the timer status (-1,0,1,2,3)
- `Timer.prototype.status` : String representing the status of the timer ( destroyed, stopped, running, paused, completed)
- `Timer.prototype.inSync`: Boolean. When cycle can't be executed respecting the provided `delay` , `ìnSync` becomes `false`.
- `Timer.prototype.timerDelay`: Integer representing the timer frequency.
- `Timer.prototype.timestamp`: Integer represemting the current timestamp.
- `Timer.prototype.currentCycle`: Integer. Cycle counter.
- `Timer.prototype.cycleLimit`: Integer representing the total ammount of cyles to be executed before timer stops.
- `Timer.prototype.cycleTimestamp` : Integer representing te timestamp corresponding to the current cycle starting time, relative to the timer start.
- `Timer.prototype.cycleDeltatime`: Integer representing the ammount of milliseconds, since the last cycle.If the cycle is `ìnSync` must match (or almost) with the provided `delay`value.


## Licence 
MIT
