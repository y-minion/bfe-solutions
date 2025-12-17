# 5. implement throttle() with leading & trailing option

## Description
<p>This is a follow up on <a href="/problem/implement-basic-throttle">4. implement basic throttle()</a>, please refer to it for detailed explanation.</p>
<p>In this problem, you are asked to implement a enhanced <code>throttle()</code> which accepts third parameter, <code>option: {leading: boolean, trailing: boolean}</code></p>
<ol>
<li>leading: whether to invoke right away</li>
<li>trailing: whether to invoke after the delay.</li>
</ol>
<p><a href="/problem/implement-basic-throttle()">4. implement basic throttle()</a> is the default case with <code>{leading: true, trailing: true}</code>.</p>
<p><strong>Explanation</strong></p>
<p>for the previous example of throttling by 3 dashes</p>
<pre><code>─ A ─ B ─ C ─ ─ D ─ ─ ─ ─ ─ ─ E ─ ─ F ─ G 
</code></pre>
<p>with <code>{leading: true, trailing: true}</code>, we get as below</p>
<pre><code>─ A ─ ─ ─ C ─ ─ ─ D ─ ─ ─ ─ E ─ ─ ─ G 
</code></pre>
<p>with <code>{leading: false, trailing: true}</code>, A and E are swallowed.</p>
<pre><code>─ ─ ─ ─ C ─ ─ ─ D ─ ─ ─ ─ ─ ─ ─ G 
</code></pre>
<p>with<code> {leading: true, trailing: false}</code>, only A D E are kept</p>
<pre><code>─ A ─ ─ ─ ─ D ─ ─ ─ ─ ─ ─ E
</code></pre>
<p>with <code>{leading: false, trailing: false}</code>, of course, nothing happens.</p>
<p><strong>notes</strong></p>
<ol>
<li>
<p>please follow above spec. the behavior is not exactly the same as <code>lodash.throttle()</code></p>
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

  const throttled = throttle(func, 3)
  input.forEach((call) =&gt; {
     const [arg, time] = call.split('@')
     setTimeout(() =&gt; throttled(arg), time)
  })
  return calls
}

expect(run(['A@0', 'B@2', 'C@3'])).toEqual(['A@0', 'C@3'])
</code></pre>