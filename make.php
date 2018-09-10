<?php
$names ='Liam,Noah,William,James,Logan,Benjamin,Mason,Elijah,Oliver,Jacob,Lucas,Michael,Alexander,Ethan,Daniel,Matthew,Aiden,Henry,Joseph,Jackson,Samuel,Sebastian,David,Carter,Wyatt,Jayden,John,Owen,Dylan,Luke,Gabriel,Anthony,Isaac,Grayson,Jack,Julian,Levi,Christopher,Joshua,Andrew,Lincoln,Mateo,Ryan,Jaxon,Nathan,Aaron,Isaiah,Thomas,Charles,Caleb';

$names = explode(',',$names);

$array = [];
for($i=0;$i<20;$i++) {
    $array[$names[$i]] = [
        'IV'=>ceil(rand(1,5)),
        'V'=>ceil(rand(1,5)),
        'VI'=>ceil(rand(1,5)),
        'I'=>ceil(rand(1,5)),
        'II'=>ceil(rand(1,5)),
        'III'=>ceil(rand(1,5)),
        'VII'=>ceil(rand(1,5)),
        'Rogue1'=>ceil(rand(1,5)),
        'Holiday'=>ceil(rand(1,5)),
    ];
}

file_put_contents('results.json',json_encode($array));