window.onload = () => {
    'use strict';
    
    $w.boolLog = true;
     
    // initialize
    $w.log('initilizing');
    
    console.log(MSTATS);
    
    console.log(getRateAndPlot(5,MSTATS));
}
/**
 * 
 * */
function getRateAll(k,data) {
    return ksimilar(k,data);
}
/**
 * 
 * */
function getRateOne(k,n,data) {
    return ksimilar(k,data,n);
}
/**
 * 
 * */
function getRateAndPlot(k,data,n) {
    let _result = ksimilar(k,data,n);
    plotResults(_result);

    return _result;
}
/**
 * 
 * */
function getRatePredict(k,data) {
    return ksimilar(k,data);
}
/**
 * @function ksimilar
 * @param {Number}
 * @param {Object}
 * @param {String}
 * @returns {Array}
 * */
function ksimilar(k,data,_compare) {
    
    var prev = null;
    var compare = [];
    let results = [];
    
    for(let key in data) {
        if(data.hasOwnProperty(key)) {
            
            if (key == _compare)
                continue;
            
            if (null == prev) {
                // just get the object for this name
                prev = data[key];
            }else{
                // add this to a small array to compare
                compare[0] = data[key];
                
                // set the second key to the previous loop
                if(typeof _compare === 'string') {
                    // no need to set prev
                    compare[1] = data[_compare];
                }else{
                    compare[1] = prev;
                    // set the previous for the next comparison
                    prev = compare[0];
                }

                let result = similar(compare[0],compare[1]);

                results.push({
                    key:key,
                    result:result,
                    original:data[key]
                });
            }
        }
    }
    // sort the results
    results.sort(function(a,b){
       return a.result - b.result;
    });
    //console.log(results);
    // @var {Array}
    let _return = [];
    // add the top K results to an array to return
    for(let i=0; i<k; i++) {
        _return.push(results[i]);
    }
    // return final result
    return _return;
}
/**
 * @function similar
 * @param {Array}
 * @param {Array}
 * @returns {Number}
 * */
function similar(a, b) {

    var sumSquares = 0;
    for(let key in a) {
        let r1 = a[key];
        let r2 = b[key];
        sumSquares += squareDiff(r1,r2);
        
    }
    return 1 / (1 + Math.sqrt(sumSquares));
}
/**
 * @function squareDiff
 * @param {Number}
 * @returns {Number}
 * */
function squareDiff(diff) {
    return diff * diff;
}
/**
 * @function plotResults
 * @param {Object}
 * */
function plotResults(data) {
    var i = $w.canvas.init(document.getElementById('target'),1000,1000);
    // get the canvas object
    $w.draw.grid(i,1000,1000,10);
    
    for(let j=0; j<data.length; j++) {
        for(let k in data[j].original) {
            let coord = dToGrid(500,data[j].original[k],(data[j].result * 10000));
            $w.canvas.circle(i,coord[0],coord[1],5,MVCOLORS[k],1,false);
        }
    }
}
/**
 *
 * */
function dToGrid(g,x,y) {
    x = x * 30;
    //y = y * 30;
    x+=g;
    //y+=g;
    return [x,y];   
}