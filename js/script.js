function startSimulation() {
    // module aliases
    var Engine = Matter.Engine,
        Render = Matter.Render,
        Runner = Matter.Runner,
        Bodies = Matter.Bodies,
        Composite = Matter.Composite;
  
    // create an engine
    var engine = Engine.create();
  
    // create a renderer
    var render = Render.create({
        element: document.body,
        //canvas: document.getElementById("matter"),
        engine: engine,
        options: {
            width: false,
            height: false,
            hasBounds: true,
            showDebug: true,
        }
    });
  
    // create two boxes and a ground
    var boxA = Bodies.rectangle(200, 290, 10, 10);
    var boxB = Bodies.rectangle(200, 120, 10, 10);
    var ground = Bodies.rectangle(153, 170, 306, 50, { isStatic: true });
  
    // add all of the bodies to the world
    Composite.add(engine.world, [boxA, boxB, ground]);
  
    // run the renderer
    Render.run(render);
  
    // create runner
    var runner = Runner.create();
  
    // run the engine
    Runner.run(runner, engine);
    }