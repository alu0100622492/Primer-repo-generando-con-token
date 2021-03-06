var exec = require("ssh-exec");
var fs = require('fs');
var fsextra = require('fs-extra');
var path = require('path');
const GitUrlParse = require("git-url-parse");



function initialize(directorio) {
    console.log("\nFuncion initialize");

    var contenido='\ngulp.task("deploy-iaas-ull", function () {'+
        '\n\tvar iaas = require("gitbook-start-plugin-iaas-ull-es-noejaco2017");'+//Creamos una variable que contiene una
        '\n\tvar url = paquete.repository.url;'+//funcion para añadir en el gulpfile a crear(nuestro plugin), donde tmb guardamos
        '\n\tvar iaas_ip = paquete.iaas.IP;'+//la ip path y url
        '\n\tvar iaas_path = paquete.iaas.PATH;'+

        '\n\n\tiaas.deploy(iaas_ip, iaas_path, url);'+//y pasamos los valores a la funcion deploy luego de hacer el initialize
        '\n});\n\n';

        fs.appendFile('gulpfile.js', contenido, function(err) {
        if (err)
            console.error(err);
            console.log("Añadiendo tarea gulp")
    });

     fs.existsSync(path.join(process.cwd(), 'node_modules','gitbook-start-team-noejaco2017','gulpfile.js')) ? console.log("Existe") : console.log("No existe");
    //
    //
    // //añadimos la tarea
    fs.writeFileSync(path.join(process.cwd(),'node_modules', 'gitbook-start-team-noejaco2017','gulpfile.js'), contenido,  {'flag':'a'},  function(err) {
        if (err) {
            return console.error(err);
        }
        console.log("Añadiendo tarea gulp de node modules")
    });
    //
    //
    // // fs.appendFile('gulpfile.js', contenido, function(err) {
    // //     if (err)
    // //         console.error(err);
    // // });
    //
    //
    //
    // //copiamos gulpfile a nuestro directorio
    console.log("VARIABLE CWD AQUIIIIIIIIIIII: "+process.cwd());
         var direct = process.cwd() + '/';
           //console.log("Despues de / : "+ direct;
    // fs.copyFile(path.join(process.cwd(), 'node_modules','gitbook-start-team-noejaco2017','gulpfile.js'), path.join(process.cwd(), directorio , 'gulpfile.js'),function(err){
    //     if(err)
    //       console.log(err);
    //      console.log("Tarea gulp añadida a gulpfile")
    // });


    fsextra.copy(path.join(process.cwd(),'./node_modules/gitbook-start-team-noejaco2017','gulpfile.js'), path.join( process.cwd()+'/' ,directorio, 'gulpfile.js'),function(err){
      if(err)
        console.log(err);
        console.log("Tarea gulp añadida a gulpfile");
    });


    // fsextra.copy(path.join(__dirname,'..','gulpfile.js'), path.join(process.cwd(), directorio , 'gulpfile.js'),function(err){
    //   if(err)
    //     console.log(err);
    // });


    console.log("\n\n---------Instalando los plugins, espere por favor ...");

};

function deploy(ip, ruta, url) {

    //var carpeta = GitUrlParse(url);

    console.log("Comenzando el deploy en Iaas");
    console.log('Direccion IP Destino: '+ip);
    //console.log('Ruta de destino: '+ruta+'/'+carpeta.name);
    //console.log('Repositorio origen: '+url);



    function puts(error, stdout, stderr) {
      if(stdout){
        console.log(stdout);
      }
      if(stderr){
        console.log(stderr);
      }
    }
    exec("ssh usuario@" + ip + " 'cd " + url + "; git pull'", puts);
};

module.exports = {
  initialize,
  deploy
}
// var express = require('express');
// var app = express();
// var path = require('path');
// var fs= require('fs-extra');
// var ejs=require('ejs');
// var milib = require('../lib/milibreria.js');
//
// //DIRECTORIO CON TEMPLATES
// app.set('views', path.join(__dirname, 'template-iaas'));
// app.set('view engine', 'ejs');
//
// //MINIMIST
// var argv = require('minimist')(process.argv.slice(2));
// console.dir(argv);
//
//
// if(argv.h || argv.help){
//     //MENU
//     console.log("gitbook-start-iaas [OPTIONS]\n"+
//     "--iaasIP: Direccion de la maquina virtual\n"+
//     "--iaaspath: Repositorio que va a contener el libro en iaas\n"+
//     "--d: Crea la estructura del directorio\n");
//
// }else{
//             if(!argv.iaasIP || !argv.iaaspath || !argv.d ){
//               console.log("Falta el argumento IP, path o directorio");
//             }else{
//               var direct = process.cwd() + '/template-iaas/';
//
//                   //Creamos el directorio
//                   fs.mkdirsSync(direct + argv.d);
//
//                   //Creamos una copia de los scripts
//                   fs.copy(path.join(__dirname, '../template-iaas', 'scripts') , path.join(direct, `${argv.d}`,'scripts'), function(err){
//                       if(err) return console.error(err)
//                   });
//                   //Creamos una copia de los txt
//                   fs.copy(path.join(__dirname, '../template-iaas', 'txt') , path.join(direct, `${argv.d}`,'txt'), function(err){
//                       if(err) return console.error(err)
//                   });
//                   //Creamos una copia de Readme
//                   fs.copy(path.join(__dirname, '../template-iaas', 'README.md') , path.join(direct, `${argv.d}`,'README.md'), function(err){
//                       if(err) return console.error(err)
//                   });
//                   //Creamos gulpfile
//                   fs.copy(path.join(__dirname, '../template-iaas', 'gulpfile.js') , path.join(direct, `${argv.d}`,'gulpfile.js'), function(err){
//                       if(err) return console.error(err)
//                   });
//                   //Creamos book.json
//                   fs.copy(path.join(__dirname, '../template-iaas', 'book.json') , path.join(direct, `${argv.d}`,'book.json'), function(err){
//                       if(err) return console.error(err)
//                   });
//                   //Creamos server
//                   fs.copy(path.join(__dirname, '../template-iaas', 'app.js') , path.join(direct, `${argv.d}`,'app.js'), function(err){
//                       if(err) return console.error(err)
//                   });
//                   ejs.renderFile(path.join(__dirname, '../template-iaas', 'package.ejs'),{direccionip:argv.iaasIP,direccionpath:argv.iaaspath},function(err, result) {
//                                    // render on success
//
//                                            if (!err) {
//                                                // result.nombre=argv.name;
//                                                // result.direcciongit=argv.url;
//                                                // result.direccionwiki='argv.wiki';
//                                                 console.log(result);
//                                                     //CREAMOS EL PACKAGE.JSON del template
//                                                        //var write=fs.writeFile("./template/package.json",result, (err) =>
//
//                                                         fs.writeFile(path.join(direct, `${argv.d}`, 'package.json'), result);
//                                                                if (err) throw err;
//                                                                console.log('CREADO PACKAGE.JSON');
//
//                                            }
//                                            // render or error
//                                            else {
//                                                     console.log('Error renderFile(package.ejs)');
//                                                     console.log(err);
//                                            }
//                                     });
//                                     milib.deploy(argv.iaasIP,argv.iaaspath);
//             }
// }
//
//                   //Creamos el packeage.json a traves de la plantilla
//                   ejs.renderFile(path.join(__dirname, '../template-iaas', 'package.ejs'),{direccionip:argv.iaasIP,direccionpath:argv.iaaspath},function(err, result) {
//                  // render on success
//
//                          if (!err) {
//                              // result.nombre=argv.name;
//                              // result.direcciongit=argv.url;
//                              // result.direccionwiki='argv.wiki';
//                               console.log(result);
//                                   //CREAMOS EL PACKAGE.JSON del template
//                                      //var write=fs.writeFile("./template/package.json",result, (err) =>
//
//                                       fs.writeFile(path.join(direct, `${argv.d}`, 'package.json'), result);
//                                              if (err) throw err;
//                                              console.log('CREADO PACKAGE.JSON');
//
//                          }
//                          // render or error
//                          else {
//                                   console.log('Error renderFile(package.ejs)');
//                                   console.log(err);
//                          }
//                   });
//
//                   //Creamos el script
//                   ejs.renderFile(path.join(__dirname, '../template-iaas/scripts', 'ssh.ejs'),{iaas:argv.iaasIP,path:argv.iaaspath},function(err, result) {
//                  // render on success
//
//                          if (!err) {
//                              // result.nombre=argv.name;
//                              // result.direcciongit=argv.url;
//                              // result.direccionwiki='argv.wiki';
//                               console.log(result);
//                                   //CREAMOS EL PACKAGE.JSON del template
//                                      //var write=fs.writeFile("./template/package.json",result, (err) =>
//
//                                       fs.writeFile(path.join(direct, '../template-iaas/scripts', 'ssh1.sh'), result);
//                                              if (err) throw err;
//                                              console.log('CREADO script SSH');
//
//                          }
//                          // render or error
//                          else {
//                                   console.log('Error renderFile(ssh.ejs)');
//                                   console.log(err);
//                          }
//                   });
//             }
// }
//EJS RENDERFILE cargamos la plantilla
// var direct = process.cwd() + '/template/';
//
//     //Creamos el directorio
//     fs.mkdirsSync(direct + argv.directorio);
//
//     //Creamos una copia de los scripts
//     fs.copy(path.join(__dirname, '../template', 'scripts') , path.join(direct, `${argv.directorio}`,'scripts'), function(err){
//         if(err) return console.error(err)
//     });
//     //Creamos una copia de los txt
//     fs.copy(path.join(__dirname, '../template', 'txt') , path.join(direct, `${argv.directorio}`,'txt'), function(err){
//         if(err) return console.error(err)
//     });
//     //Creamos una copia de Readme
//     fs.copy(path.join(__dirname, '../template', 'README.md') , path.join(direct, `${argv.directorio}`,'README.md'), function(err){
//         if(err) return console.error(err)
//     });
//     //Creamos gulpfile
//     fs.copy(path.join(__dirname, '../template', 'gulpfile.js') , path.join(direct, `${argv.directorio}`,'gulpfile.js'), function(err){
//         if(err) return console.error(err)
//     });
//
//
//
//     //Creamos el packeage.json a traves de la plantilla
//     ejs.renderFile(path.join(__dirname, '../template', 'package.ejs'),{nombre:argv.name, num:argv.version, direcciongit:argv.url, direccionwiki:argv.wiki, autor:argv.autor, email:argv.email},function(err, result) {
//    // render on success
//
//            if (!err) {
//                // result.nombre=argv.name;
//                // result.direcciongit=argv.url;
//                // result.direccionwiki='argv.wiki';
//                 console.log(result);
//                     //CREAMOS EL PACKAGE.JSON del template
//                        //var write=fs.writeFile("./template/package.json",result, (err) => {
//                         fs.writeFile(path.join(direct, `${argv.directorio}`, 'package.json'), result);
//                                if (err) throw err;
//                                console.log('CREADO PACKAGE.JSON');
//
//            }
//            // render or error
//            else {
//                     console.log('Error renderFile(package.ejs)');
//                     console.log(err);
//            }
//     });
//}
