
 <body>
    <h1 style="text-align: center">TweakSvg Documentation (v1.0)</h1>
    <h2 style="color: #c77d52;"> document. SVGs</h2>
    <p style="text-align: justify;margin-block-end: 3em;">This returns all SVG on the document object.<br/><br/> They are stored like an array but are not infact an array. You can access each element of the returned value with its index but it can not be looped.<br/><br/> Incases where you need to loop through it, consider converting it to an array using <span style="color: #ff423b;font-weight: 300;font-size: 0.8em;">array</span>.<span style="color: #825236;">from</span></p>
    <h2 style="color: #c77d52;">SVG(<span style="color: #825236;">Element</span> <sup style="color: #000;font-size: .5em;">[<span style="color: #55a04b;font-weight: 300;font-size: .5em;">HTMLElement</span>]</sup>)</h2>
    <p style="text-align: justify;margin-block-end: 3em;">This convert <span style="color: #825236;">Element</span> to a foreign object that can easily be appended to the inside of an SVG.</p>
      <h2 style="color: #c77d52;"><span style="color: #ff423b;font-weight: 300;font-size: 0.8em;">new</span> SVG(<span style="color: #825236;">shape</span><sup style="color: #000;font-size: .5em;">[<span style="color: #55a04b;font-weight: 300;font-size: .5em;">str</span>]</sup><sub>(opt)</sub>, <span style="color: #825236;">attributes</span><sup style="color: #000;font-size: .5em;">[<span style="color: #55a04b;font-weight: 300;font-size: .5em;">obj</span>]</sup><sub>(opt)</sub>)</h2>
      <p style="text-align: justify;margin-block-end: 3em;">When invoke with no argument, this create an SVG Element with preserveAspectRatio set to true and viewBox set to &quot;<span style="color: #825236;">0 0 100 100</span>&quot; as default properties.<br/><br/>
      If only the first optional argument <span style="color: #825236;">shape</span> is provided,  this return an SVG of type <span style="color: #825236;">shape</span>.
      <br/><br/>
      If the second argument <span style="color: #825236;">attributes</span> is provided, the keys' value are set as the corresponding attribute for the keys.</p>
      <h2 style="color: #c77d52;">svg. setAttr(<span style="color: #825236;">attr</span><sup style="color: #000;font-size: .5em;">[<span style="color: #55a04b;font-weight: 300;font-size: .5em;">str</span>]</sup>, <span style="color: #825236;">value</span><sup style="color: #000;font-size: .5em;">[<span style="color: #55a04b;font-weight: 300;font-size: .5em;">str</span>]</sup> || <span style="color: #825236;">attributes</span>) </h2>
      <p style="text-align: justify;margin-block-end: 3em;">It can be argument with an attribute and its desired value or an object with key value pairs for all the attribute value to be set.<br/><br/> When it is argumented with two attributes, <span style="color: #825236;">attr</span> and <span style="color: #825236;">value</span>, it sets <span style="color: #825236;">value</span> to the SVG attribute corresponding to <span style="color: #825236;">attr</span>.<br/><br/>
      When it is argumented with a single argument, <span style="color: #825236;">attributes</span>, the keys' values are set to the SVG attribute corresponding to the keys.
      </p>
      <h2 style="color: #c77d52;">svg. innerSVG</h2>
      <p style="text-align: justify;margin-block-end: 3em;">This is use to set or get the markup of an SVG element, It can be acknowledge as SVG own implementation of innerHTML.</p>
      <h2 style="color: #c77d52;">svg. transition(<span style="color: #825236;">attr<sup style="color: #000;font-size: .5em;">[<span style="color: #55a04b;font-weight: 300;font-size: .5em;">str</span>]</sup></span><sub>(opt)</sub>, <span style="color: #825236;">time<sup style="color: #000;font-size: .5em;">[<span style="color: #55a04b;font-weight: 300;font-size: .5em;">str</span>]</sup></span><sub>(opt)</sub>, <span style="color: #825236;">easing<sup style="color: #000;font-size: .5em;">[<span style="color: #55a04b;font-weight: 300;font-size: .5em;">str</span>]</sup></span><sub>(opt)</sub>, <span style="color: #825236;">delay<sup style="color: #000;font-size: .5em;">[<span style="color: #55a04b;font-weight: 300;font-size: .5em;">str</span>]</sup></span><sub>(opt)</sub>)</h2>
      <p style="text-align: justify;margin-block-end: 3em;">The defaults are: &quot;all&quot;, &quot;0s&quot;, &quot;linear&quot;, &quot;delay&quot;.<br/>
      The defaults are changed depending on number of argument provided.<br/><br/>
      The first argument is the name of the attribute transition is going to be affected. When set to &quot;all&quot;, it apply to all attribute that can be transitioned, with no previous or later transition of their own.<br/><br/>
      The second argument is the time it takes tobtransition completely. The unit can be in either <span style="color: #ff423b;font-weight: 300;font-size: 0.8em;">ms</span> or <span style="color: #ff423b;font-weight: 300;font-size: 0.8em;">s</span>.<br/><br/>
      The third argument is the easing, this determine the rate of change of the value over time. (the two available now are linear and ease-in).<br/><br/>
      The fourth argument is the delay, this is the time to wait before transitioning. It unit can be in either <span style="color: #ff423b;font-weight: 300;font-size: 0.8em;">ms</span> or <span style="color: #ff423b;font-weight: 300;font-size: 0.8em;">s</span>.<br/><br/>
      Transitioning takes place each time an SVG initialised attribute changes value. This only works for value changed with the <span style="color: #ff423b;font-weight: 300;font-size: 0.8em;">svg</span>.<span style="color: #825236;">setAttr</span>
      </p>
      <h2 style="color: #c77d52;">svg. pauseTransition(<span style="color: #825236;">attr1<sup style="color: #000;font-size: .5em;">[<span style="color: #55a04b;font-weight: 300;font-size: .5em;">str</span>]</sup></span>, <span style="color: #825236;">attr2<sup style="color: #000;font-size: .5em;">[<span style="color: #55a04b;font-weight: 300;font-size: .5em;">str</span>]</sup></span><sub>(opt)</sub>, ...)</h2>
      <p style="text-align: justify;margin-block-end: 3em;">
        This pauses the transitioning of all argument provided. One positional argument is compulsory while others are optional.
      </p>
      <h2 style="color: #c77d52;">svg. resumeTransition(<span style="color: #825236;">attr1<sup style="color: #000;font-size: .5em;">[<span style="color: #55a04b;font-weight: 300;font-size: .5em;">str</span>]</sup></span>, <span style="color: #825236;">attr2<sup style="color: #000;font-size: .5em;">[<span style="color: #55a04b;font-weight: 300;font-size: .5em;">str</span>]</sup></span><sub>(opt)</sub>, ...)</h2>
      <p style="text-align: justify;margin-block-end: 3em;">
        This resumes the transitioning of all argument provided. One positional argument is compulsory while others are optional.
      </p>
      <h2 style="color: #c77d52;">svg. terminateTransition(<span style="color: #825236;">attr1<sup style="color: #000;font-size: .5em;">[<span style="color: #55a04b;font-weight: 300;font-size: .5em;">str</span>]</sup></span>, <span style="color: #825236;">attr2<sup style="color: #000;font-size: .5em;">[<span style="color: #55a04b;font-weight: 300;font-size: .5em;">str</span>]</sup></span><sub>(opt)</sub>, ...)</h2>
      <p style="text-align: justify;margin-block-end: 3em;">
        This terminates the transitioning of all argument provided. One positional argument is compulsory while others are optional.
      </p>
 </body>
