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
<pre class="shiki github-dark shaku" style="background-color:#24292e;color:#e1e4e8" tabindex="0"><code><span class="line"><span style="color:#F97583">let</span><span style="color:#E1E4E8"> currentTime </span><span style="color:#F97583">=</span><span style="color:#79B8FF"> 0</span></span><span class="line"></span><span class="line"><span style="color:#F97583">const</span><span style="color:#B392F0"> run</span><span style="color:#F97583"> =</span><span style="color:#E1E4E8"> (</span><span style="color:#FFAB70">input</span><span style="color:#E1E4E8">) </span><span style="color:#F97583">=&gt;</span><span style="color:#E1E4E8"> {</span></span><span class="line"><span style="color:#E1E4E8">  currentTime </span><span style="color:#F97583">=</span><span style="color:#79B8FF"> 0</span></span><span class="line"><span style="color:#F97583">  const</span><span style="color:#79B8FF"> calls</span><span style="color:#F97583"> =</span><span style="color:#E1E4E8"> []</span></span><span class="line"></span><span class="line"><span style="color:#F97583">  const</span><span style="color:#B392F0"> func</span><span style="color:#F97583"> =</span><span style="color:#E1E4E8"> (</span><span style="color:#FFAB70">arg</span><span style="color:#E1E4E8">) </span><span style="color:#F97583">=&gt;</span><span style="color:#E1E4E8"> {</span></span><span class="line"><span style="color:#E1E4E8">     calls.</span><span style="color:#B392F0">push</span><span style="color:#E1E4E8">(</span><span style="color:#9ECBFF">`${</span><span style="color:#E1E4E8">arg</span><span style="color:#9ECBFF">}@${</span><span style="color:#E1E4E8">currentTime</span><span style="color:#9ECBFF">}`</span><span style="color:#E1E4E8">)</span></span><span class="line"><span style="color:#E1E4E8">  }</span></span><span class="line"></span><span class="line"><span style="color:#F97583">  const</span><span style="color:#79B8FF"> throttled</span><span style="color:#F97583"> =</span><span style="color:#B392F0"> throttle</span><span style="color:#E1E4E8">(func, </span><span style="color:#79B8FF">3</span><span style="color:#E1E4E8">)</span></span><span class="line"><span style="color:#E1E4E8">  input.</span><span style="color:#B392F0">forEach</span><span style="color:#E1E4E8">((</span><span style="color:#FFAB70">call</span><span style="color:#E1E4E8">) </span><span style="color:#F97583">=&gt;</span><span style="color:#E1E4E8"> {</span></span><span class="line"><span style="color:#F97583">     const</span><span style="color:#E1E4E8"> [</span><span style="color:#79B8FF">arg</span><span style="color:#E1E4E8">, </span><span style="color:#79B8FF">time</span><span style="color:#E1E4E8">] </span><span style="color:#F97583">=</span><span style="color:#E1E4E8"> call.</span><span style="color:#B392F0">split</span><span style="color:#E1E4E8">(</span><span style="color:#9ECBFF">'@'</span><span style="color:#E1E4E8">)</span></span><span class="line"><span style="color:#B392F0">     setTimeout</span><span style="color:#E1E4E8">(() </span><span style="color:#F97583">=&gt;</span><span style="color:#B392F0"> throttled</span><span style="color:#E1E4E8">(arg), time)</span></span><span class="line"><span style="color:#E1E4E8">  })</span></span><span class="line"><span style="color:#F97583">  return</span><span style="color:#E1E4E8"> calls</span></span><span class="line"><span style="color:#E1E4E8">}</span></span><span class="line"></span><span class="line"><span style="color:#B392F0">expect</span><span style="color:#E1E4E8">(</span><span style="color:#B392F0">run</span><span style="color:#E1E4E8">([</span><span style="color:#9ECBFF">'A@0'</span><span style="color:#E1E4E8">, </span><span style="color:#9ECBFF">'B@2'</span><span style="color:#E1E4E8">, </span><span style="color:#9ECBFF">'C@3'</span><span style="color:#E1E4E8">])).</span><span style="color:#B392F0">toEqual</span><span style="color:#E1E4E8">([</span><span style="color:#9ECBFF">'A@0'</span><span style="color:#E1E4E8">, </span><span style="color:#9ECBFF">'C@3'</span><span style="color:#E1E4E8">])</span></span></code></pre>