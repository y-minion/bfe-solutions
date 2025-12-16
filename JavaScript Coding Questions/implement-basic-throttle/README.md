# 4. implement basic throttle()

## Description
<p>Throttling is a common technique used in Web apps,
in most cases using <a href="https://lodash.com/docs/4.17.15#throttle">lodash solution</a>
would be a good choice.</p>
<p>In case you forgot, <code>throttle(func, delay)</code> returns a
throttled function,
which invokes <code>func</code> at a max frequency no matter how throttled one is called.</p>
<p>Here is an example.</p>
<p>Before throttling we have following series of calls.</p>
<pre><code>─ A ─ B ─ C ─ ─ D ─ ─ ─ ─ ─ ─ E ─ ─ F ─ G
</code></pre>
<p>After throttling at wait time of 3 dashes, it becomes like this.</p>
<pre><code>─ A ─ ─ ─ C ─ ─ ─ D ─ ─ ─ ─ E ─ ─ ─ G 
</code></pre>
<p>A is triggered right way because not in waiting time.
B is swallowed because B, C are in the cooling time from A, and C is called after B.</p>
<p>Could you implement your own version of basic <code>throttle()</code>?</p>
<p><strong>notes</strong></p>
<ol>
<li>
<p>Please follow above spec, the behavior is not exactly the same as <code>lodash.throttle()</code>.</p>
</li>
<li>
<p>Since <code>window.setTimeout</code> and <code>window.clearTimeout</code> are not
accurate in browser environment,
they are replaced with other implementation when judging your code.
They still have the same interfaces, and internally keep track of the timing for testing purpose.</p>
</li>
</ol>
<p>Some code like below is used to test your implementation.</p>
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