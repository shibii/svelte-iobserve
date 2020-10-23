# @shibiii/svelte-iobserve

This is a work-in-progress svelte action to register an [intersection observer](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API "intersection observer").

## installation

```bash
npm install @shibiii/svelte-iobserve --save
```

## usage

This piece of code registers a div element with an intersection observer action. The action is configured with a _mandatory_ callback, which in this example increments the counter. The optional cooldown parameter can be set to slow the pace at which the callback function fires at.

```html
<script>
  import { iobserve } from '@shibiii/svelte-iobserve';

  let counter = 0;
  const increment = () => {
    counter += 1;
  };
</script>

<style>
  h1 {
    position: sticky;
    top: 0;
  }
  div {
    background-color: cornflowerblue;
    margin-top: 110vh;
  }
</style>

<h1>{counter}</h1>
<div use:iobserve={{ onIntersect: increment, cooldown: 1000 }}>
  every second this div is in the viewport the counter increases by one
</div>
```

## configuration

The iobserve action can be configured by passing the following parameters:

- **onIntersect**
  a mandatory callback function which fires on an intersection

- **delay**
  an arming delay before the first intersection can trigger

- **cooldown**
  a delay before an intersection can trigger again

- **once**
  if non-falsy, unregisters the observer after the first time it triggers

- **update**
  a parameter which, if its value changes, the observer will reattach

- **fallback**
  a function which will be called if the running platform does not support intersection observers

## license

ISC
