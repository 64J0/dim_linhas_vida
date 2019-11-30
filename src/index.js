let calcular = document.getElementById('calcular');

function comprimento_do_cabo(vao, flecha) {

  let resultado = vao*(1+(2/3)*(Math.pow((2*flecha), 2)));

  document.getElementById('comprimento_cabo').innerHTML = 
  resultado.toFixed(4);

  return resultado;
}

function alongamento_cabo(B16, B20, B12, B13, B4) {

  let resultado = ((B16*B20)/(B12*B13*(Math.pow(B4, 2))))*1000;

  document.getElementById('alongamento_cabo').innerHTML = 
  resultado.toFixed(4);

  return resultado;
}

function f1 (B3, B19) {

  let resultado = (B3*1000*B19);

  document.getElementById('flecha_inicial').innerHTML =
  resultado.toFixed(4);

  return resultado;
}

function f2(B20, B3) {

  let resultado = (Math.pow((B20*0.5), 2)) - (Math.pow((B3*0.5), 2));
  resultado = Math.sqrt(resultado)*1000;

  document.getElementById('flecha_cabo_reto').innerHTML =  
  resultado.toFixed(4);

  return resultado;

}

function f3(B20, B21, B3) {

  let resultado = Math.pow((B20*0.5)+(B21/(2*1000)), 2) - Math.pow(B3*0.5, 2);
  resultado = Math.sqrt(resultado)*1000;

  document.getElementById('flecha_total').innerHTML = 
  resultado.toFixed(4);

  return resultado;
}

function distancia_frenagem(B24, B23) {

  let resultado = B24 - B23;

  document.getElementById('dist_frenagem').innerHTML = 
  resultado.toFixed(4);

  return resultado;

}

function P(B6, B2) {

  let resultado = (600 + (B2-1)*B6);

  document.getElementById('carga_corpo').innerHTML = 
  resultado.toFixed(4);
  
  return resultado;
}

function T1(B26, B20, B21, B24) {

  let resultado = (B26*0.5*((B20/2)+(B21/(2*1000))))/(B24/1000);

  document.getElementById('forca_cabo').innerHTML = 
  resultado.toFixed(4);

  return resultado;
}

function Fadm(B5) {

  let resultado = B5*0.8/2;

  document.getElementById('B28').innerHTML = resultado.toFixed(4);

  return resultado;

}

function n(B6) {

  document.getElementById('B29').innerHTML = B6;

}

function ZLQ1(B7, B8, B24) {

  let resultado = (Number(B7) + Number(B8) + Number(B24/1000) + Number(1.8) + Number(1));

  document.getElementById('B30').innerHTML = resultado.toFixed(4);

  return resultado;

}

function ZLQ2(B9, B24) {

  let resultado = (Number(B9) + (B24/1000) + 1.8 + 1);

  document.getElementById('B31').innerHTML = resultado.toFixed(4);

  return resultado;

}

function Hp(B24, B22, B10, B11) {

  let resultado = (B24 - B22 + Number(B10) - Number(B11) + 1)/100;

  document.getElementById('B32').innerHTML = resultado.toFixed(4);

  return resultado;

}

function coef_utiliz_cabo(B27, B28) {

  let resultado = (B27/B28)*100;

  document.getElementById('B33').innerHTML = resultado.toFixed(4);

  return resultado;

}

function fator_servico(B28, B27) {

  let resultado = (Number(B28)*2)/Number(B27);

  document.getElementById('B34').innerHTML = Number(resultado).toFixed(4);

  return resultado;

}

function determinar_valores(chute_inicial) {

  let massa = document.getElementById('massa');
  let vao = document.getElementById('vao');
  let diametro = document.getElementById('diametro');
  let forca_ruptura = document.getElementById('fu');
  let num_pessoas = document.getElementById('num_pessoas');
  let comprimento_talabarte = document.getElementById('a');
  let comprimento_abs_estendido = document.getElementById('c');
  let trava_quedas_retratil = document.getElementById('A1');
  let espaco_frenagem_trava_quedas_retratil = document.getElementById('B1');
  let distancia_posicao_recolhida_a_posicao_de_trabalho = document.getElementById('b1');
  let modulo_elasticidade = document.getElementById('E');
  let fator_multiplicacao = document.getElementById('fator');
  let flecha = document.getElementById('flecha');

  let B20 = comprimento_do_cabo(vao.value, flecha.value);

  let B21 = alongamento_cabo(chute_inicial, 
    comprimento_do_cabo(vao.value, flecha.value),
    modulo_elasticidade.value,
    fator_multiplicacao.value,
    diametro.value
    );

  let B22 = f1(vao.value, flecha.value);

  let B23 = f2(
    comprimento_do_cabo(vao.value, flecha.value),
    vao.value
    );

  let B24 = f3(B20, B21, vao.value);

  let B25 = distancia_frenagem(B24, B23);

  let B26 = P(massa.value, num_pessoas.value);

  let B27 = T1(B26, B20, B21, B24);

  let B28 = Fadm(forca_ruptura.value);

  let B29 = n(num_pessoas.value);

  let B30 = ZLQ1(comprimento_talabarte.value,
    comprimento_abs_estendido.value,
    B24);

  let B31 = ZLQ2(trava_quedas_retratil.value,
    B24);

  let B32 = Hp(B24, B22,
    espaco_frenagem_trava_quedas_retratil.value,
    distancia_posicao_recolhida_a_posicao_de_trabalho.value);
  
  let B33 = coef_utiliz_cabo(B27, B28);

  let B34 = fator_servico(B28, B27);

  return B27;
}

// calcular.addEventListener('click', determinar_valores(1500));

function gerencia() {

  let contador = 0;
  let verificado = false;
  let B27 = 0;
  let chute_inicial = 0;

  do {

    if (contador == 0) {
      chute_inicial = 1500;
      B27 = determinar_valores(chute_inicial); //Inicia os cálculos com valor chutado padrão
    } else {
      chute_inicial = (chute_inicial + B27)*0.5;
      B27 = determinar_valores(chute_inicial);
    }

    console.log('Chute inicial, iteração ' + contador + ' : ' + chute_inicial);

    if (Math.abs(Number(B27) - Number(chute_inicial)) <= 1) {
      verificado = true;
    }

    contador++;

  } while((contador <= 100) && (verificado == false));

  
  document.getElementById('chute_inicial').value = chute_inicial.toFixed(4);
  return console.log('Cálculos finalizados!');

}