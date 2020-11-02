# @shibiii/svelte-iobserve

This is a work-in-progress svelte action to register an [intersection observer](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API "intersection observer").

## installation

```bash
npm install @shibiii/svelte-iobserve --save
```

## usage

This piece of code registers a div element with an intersection observer action. The action will emit _intersection_ event when intersection condition is met. The optional cooldown parameter can be set to allow the intersection event to retrigger as long as the intersection condition is met.

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
<div on:intersection={increment} use:iobserve={{ cooldown: 1000 }}>
  every second this div is in the viewport the counter increases by one
</div>
```

## intersection event

The iobserve action emits a custom intersection event when intersection triggers. The emitted event passes the [IntersectionObserverEntry](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserverEntry) object in the detail property.

```html
<script>
  const printDetails = (event) => {
    console.log(event.detail);
  };
</script>

<p on:intersection="{printDetails}" use:iobserve>
  I print my intersection details
</p>
```

## configuration

The iobserve action can be configured by passing the following parameters:

- **options**

  - this object passes [properties](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver#Properties) to the underlying IntersectionObserver

- **delay**

  - an arming delay in milliseconds before the first intersection can trigger

- **cooldown**

  - cooldown in milliseconds before intersection can retrigger
  - unlike the IntersectionObserver api's default behaviour, if this is set, intersection will keep retriggering as long as intersection conditions are met

- **once**

  - if non-falsy, observer will unregister after the first time it triggers

- **update**

  - a parameter which, if its value changes, the observer will reattach
  - upon reattatching the intersection will trigger if conditions are met

- **fallback**
  - a function which will be called if the running platform does not support intersection observers

## license

ISC
