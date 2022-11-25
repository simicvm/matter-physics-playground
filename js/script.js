function startSimulation() {
    // module aliases
    var Engine = Matter.Engine,
        Render = Matter.Render,
        Runner = Matter.Runner,
        Bodies = Matter.Bodies,
        Composite = Matter.Composite,
        Mouse = Matter.Mouse,
        MouseConstraint = Matter.MouseConstraint,
        Svg = Matter.Svg;
  
    // create an engine
    var engine = Engine.create({
        gravity: {
            x: 0,
            y: 0,
            scale: 0.001,
        }
    });
  
    // create a renderer
    var render = Render.create({
        element: document.body,
        //canvas: document.getElementById("matter"),
        engine: engine,
        options: {
            width: 600,
            height: 300,
        }
    });

    var select = function(root, selector) {
        return Array.prototype.slice.call(root.querySelectorAll(selector));
    };

    var loadSvg = function(url) {
        return fetch(url)
            .then(function(response) { return response.text(); })
            .then(function(raw) { return (new window.DOMParser()).parseFromString(raw, 'image/svg+xml'); });
    };

    // create two boxes and a ground
    var boxA = Bodies.rectangle(200, 120, 20, 20);
    //var boxB = Bodies.rectangle(200, 120, 10, 10);
    //var ground = Bodies.rectangle(153, 170, 306, 50, { isStatic: true });
  
    loadSvg('./svg/spaceship-small.svg')
        .then(function(root) {
            var paths = select(root, 'path');

            var vertexSets = paths.map(function(path) { return Svg.pathToVertices(path, 30); });

            var agent = Bodies.fromVertices(100, 100, vertexSets, {
                render: {
                    fillStyle: '#060a19',
                    strokeStyle: '#060a19',
                    lineWidth: 1,
                }
            }, true);
            // add all of the bodies to the world
            //Composite.add(engine.world, [boxA, boxB, ground]);
            Composite.add(engine.world, [boxA, agent]);
        });


    // add mouse control
    var mouse = Mouse.create(render.canvas), 
        mouseConstraint = MouseConstraint.create(engine, {
            mouse: mouse,
            constraint: {
                stiffness: 0.2,
                render: {
                    visible: true
                }
            }
        });
    Composite.add(engine.world, mouseConstraint)

    // keep the mouse in sync with rendering
    render.mouse = mouse;
  
    // run the renderer
    Render.run(render);
  
    // create runner
    var runner = Runner.create();
  
    // run the engine
    Runner.run(runner, engine);
}