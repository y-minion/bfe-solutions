# 6. implement basic debounce()

## Description
<p>Debounce is a common technique used in Web Application, in most cases using <a href="https://lodash.com/docs/4.17.15#debounce">lodash solution</a> would be a good choice.</p>
<p>could you implement your own version of basic <code>debounce()</code>?</p>
<p>In case you forgot, <code>debounce(func, delay)</code> will returned a debounced function, which delays the invoke.</p>
<p>Here is an example.</p>
<p>Before debouncing we have a series of calling like</p>
<pre><code>─ A ─ B ─ C ─ ─ D ─ ─ ─ ─ ─ ─ E ─ ─ F ─ G 
</code></pre>
<p>After debouncing at wait time of 3 dashes</p>
<pre><code>─ ─ ─ ─ ─ ─ ─ ─ D ─ ─ ─ ─ ─ ─ ─ ─ ─ G 
</code></pre>
<p><strong>notes</strong></p>
<ol>
<li>
<p>please follow above spec. the behavior might not be exactly the same as <code>lodash.debounce()</code></p>
</li>
<li>
<p>because <code>window.setTimeout</code> and <code>window.clearTimeout</code> are not accurate in browser environment, they are replaced to other implementation when judging your code. They still have the same interface, and internally keep track of the timing for testing purpose.</p>
</li>
</ol>
<p>Something like below will be used to do the test.</p>
<pre><code>let currentTime = 0

const run = (input) =&gt; {
  currentTime = 0
  const calls = []

  const func = (arg) =&gt; {
     calls.push(`${arg}@${currentTime}`)
  }

  const debounced = debounce(func, 3)
  input.forEach((call) =&gt; {
     const [arg, time] = call.split('@')
     setTimeout(() =&gt; debounced(arg), time)
  })
  return calls
}

expect(run(['A@0', 'B@2', 'C@3'])).toEqual(['C@5'])
</code></pre>