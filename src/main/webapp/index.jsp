<%@ page contentType="text/html;charset=UTF-8" language="java" pageEncoding="UTF-8" %>

<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">

        <!-- FONTS -->
        <link rel="stylesheet" href="assets/fonts/Sabrina/stylesheet.css">

        <!-- CSS BUNDLE -->
        <link rel="stylesheet" href="dist/css/main.css" />

        <!-- DUCK (?) -->

        <link rel="icon" href="assets/img/duck.png" type="image/x-icon" />

        <title>Лабораторная работа</title>
    </head>
    <body style="background-image: url('assets/img/итмо_bg.png'); background-repeat: repeat-x; background-size: 600px;">        
        
        <a href="https://github.com/ssnagin/web-sem3-lab1" class="github-corner" aria-label="View source on GitHub"><svg width="80" height="80" viewBox="0 0 250 250" style="fill: #2e1c31; color:#fff; position: absolute; top: 0; border: 0; right: 0;" aria-hidden="true"><path d="M0,0 L115,115 L130,115 L142,142 L250,250 L250,0 Z"></path><path d="M128.3,109.0 C113.8,99.7 119.0,89.6 119.0,89.6 C122.0,82.7 120.5,78.6 120.5,78.6 C119.2,72.0 123.4,76.3 123.4,76.3 C127.3,80.9 125.5,87.3 125.5,87.3 C122.9,97.6 130.6,101.9 134.4,103.2" fill="currentColor" style="transform-origin: 130px 106px;" class="octo-arm"></path><path d="M115.0,115.0 C114.9,115.1 118.7,116.5 119.8,115.4 L133.7,101.6 C136.9,99.2 139.9,98.4 142.2,98.6 C133.8,88.0 127.5,74.4 143.8,58.0 C148.5,53.4 154.0,51.2 159.7,51.0 C160.3,49.4 163.2,43.6 171.4,40.1 C171.4,40.1 176.1,42.5 178.8,56.2 C183.1,58.6 187.2,61.8 190.9,65.4 C194.5,69.0 197.7,73.2 200.1,77.6 C213.8,80.2 216.3,84.9 216.3,84.9 C212.7,93.1 206.9,96.0 205.4,96.6 C205.1,102.4 203.0,107.8 198.3,112.5 C181.9,128.9 168.3,122.5 157.7,114.1 C157.9,116.9 156.7,120.9 152.7,124.9 L141.0,136.5 C139.8,137.7 141.6,141.9 141.8,141.8 Z" fill="currentColor" class="octo-body"></path></svg></a><style>.github-corner:hover .octo-arm{animation:octocat-wave 560ms ease-in-out}@keyframes octocat-wave{0%,100%{transform:rotate(0)}20%,60%{transform:rotate(-25deg)}40%,80%{transform:rotate(10deg)}}@media (max-width:500px){.github-corner:hover .octo-arm{animation:none}.github-corner .octo-arm{animation:octocat-wave 560ms ease-in-out}}</style>
        
        <table 
            border="0"
            class="col-12"
        >
            <tr class="header">
                <td class="col-12" colspan="2">
                    <div class="headline">
                        <h1 class="special-fantasy-font-block">Лабораторная работа</h1><h1 style="user-select: none;" id="counter" value="1">1</h1>
                    </div>
                    <hr>
                    <p class="pd-10px font-code">Снагин Станислав P3215 | 321582 вар.</p>
                </td>
            </tr>
            <tr class="sn-website-container">
                <td class="col-4">
                    <section>
                        <form onsubmit="submit(e)" method="post" class="sn-default-form">
                            
                            <h2>Отправить точку в полёт</h2>

                            <br>

                            <label for="">Координата X</label>
                            <table id="buttons-single-choice" class="pd-10px col-12">
                                <tr>
                                    <td><input type="button" value="-4"></td>
                                    <td><input type="button" value="-3"></td>
                                    <td><input type="button" value="-2"></td>
                                    <td><input type="button" value="-1"></td>
                                    <td><input type="button" value="0"></td>
                                </tr>
                                <tr>
                                    <td><input type="button" value="1"></td>
                                    <td><input type="button" value="2"></td>
                                    <td><input type="button" value="3"></td>
                                    <td><input type="button" value="4"/></td>
                                    <td><input reset-button type="button" value="reset"/></td>
                                </tr>
                            </table>

                            <label for="CoordY">Координата Y</label>

                            <div>
                                <input id="CoordY" pattern="-?[0-9]+(\.[0-9]+)?" title="Число от -3 до 5" class="col-12" type="text" min="-3" max="5" placeholder="    Цифорка Y" />
                            </div>
                            
                            <label for="CoordR">Радиус</label>
                            
                            <table class="pd-10px col-12">
                                <tr id="z-checkbox-container">
                                    <td><input name="z" type="checkbox" value="1" id="checkbox1"><label for="checkbox1"> 1</label></td>
                                    <td><input name="z" type="checkbox" value="2" id="checkbox2"><label for="checkbox2"> 2</label></td>
                                    <td><input name="z" type="checkbox" value="3" id="checkbox3"><label for="checkbox3"> 3</label></td>
                                    <td><input name="z" type="checkbox" value="4" id="checkbox4"><label for="checkbox4"> 4</label></td>
                                    <td><input name="z" type="checkbox" value="5" id="checkbox5"><label for="checkbox5"> 5</label></td>
                                </tr>
                            </table>

                            <div><input id="form-submit" class="col-12 pd-10px" type="button" type="submit" value="Отправить!" /></div>
                        
                            <div id="error-field">
                            </div>
                        </form>
                    </section>
                </td>
                <td class="col-8">
                    <section>
                        <div class="sn-canvas-container">
                            <div>
                                <h3>R = 1</h3>
                                <canvas  width="450" height="450"></canvas>
                            </div>
                            <div>
                                <h3>R = 2</h3>
                                <canvas  width="450" height="450"></canvas>
                            </div>
                            <div>
                                <h3>R = 3</h3>
                                <canvas  width="450" height="450"></canvas>
                            </div>
                            <div>
                                <h3>R = 4</h3>
                                <canvas  width="450" height="450"></canvas>
                            </div>
                            <div>
                                <h3>R = 5</h3>
                                <canvas  width="450" height="450"></canvas>
                            </div>
                        </div>
                    </section>
                    <section>
                        <details open>
                            <summary>Показать задание</summary>
                            <br>
                            <p>Разработать FastCGI сервер на языке Java, определяющий попадание точки на координатной плоскости в заданную область, и создать HTML-страницу, которая формирует данные для отправки их на обработку этому серверу.

Параметр R и координаты точки должны передаваться серверу посредством HTTP-запроса. Сервер должен выполнять валидацию данных и возвращать HTML-страницу с таблицей, содержащей полученные параметры и результат вычислений - факт попадания или непопадания точки в область (допускается в ответе сервера возвращать json строку, вместо html-страницы). Предыдущие результаты должны сохраняться между запросами и отображаться в таблице.

Кроме того, ответ должен содержать данные о текущем времени и времени работы скрипта.</p>

                            <img src="assets/img/img.png" alt="" srcset="" />
                        </details>
                    </section>
                </td>
            </tr>
            <tr>
                <td colspan="2">
                   <footer>
                        <section>
                            <h2>Результаты</h2>
                            <br>
                            <button id="clear-table">Отчистить</button>
                            <table class="col-6" id="sn-form-result-table">
                                <tbody>
                                    
                                </tbody>
                            </table>
                        </section>
                   </footer> 
                </td>
            </tr>
        </table>

        <!-- JS BUNDLE --> 
        <script src="dist/js/main.js"></script>
    </body>
</html>