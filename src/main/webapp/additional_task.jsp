<%@ page contentType="text/html;charset=UTF-8" language="java" pageEncoding="UTF-8" %>
<%@ taglib prefix="data" uri="http://ssnagin.com/data-tags" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

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

        <title>Лабораторная работа 2</title>
    </head>
    <body style="background-image: url('assets/img/итмо_bg.png'); background-repeat: repeat-x; background-size: 600px;">        
        
        <a href="https://github.com/ssnagin/web-sem3-lab2" class="github-corner" aria-label="View source on GitHub"><svg width="80" height="80" viewBox="0 0 250 250" style="fill: #2e1c31; color:#fff; position: absolute; top: 0; border: 0; right: 0;" aria-hidden="true"><path d="M0,0 L115,115 L130,115 L142,142 L250,250 L250,0 Z"></path><path d="M128.3,109.0 C113.8,99.7 119.0,89.6 119.0,89.6 C122.0,82.7 120.5,78.6 120.5,78.6 C119.2,72.0 123.4,76.3 123.4,76.3 C127.3,80.9 125.5,87.3 125.5,87.3 C122.9,97.6 130.6,101.9 134.4,103.2" fill="currentColor" style="transform-origin: 130px 106px;" class="octo-arm"></path><path d="M115.0,115.0 C114.9,115.1 118.7,116.5 119.8,115.4 L133.7,101.6 C136.9,99.2 139.9,98.4 142.2,98.6 C133.8,88.0 127.5,74.4 143.8,58.0 C148.5,53.4 154.0,51.2 159.7,51.0 C160.3,49.4 163.2,43.6 171.4,40.1 C171.4,40.1 176.1,42.5 178.8,56.2 C183.1,58.6 187.2,61.8 190.9,65.4 C194.5,69.0 197.7,73.2 200.1,77.6 C213.8,80.2 216.3,84.9 216.3,84.9 C212.7,93.1 206.9,96.0 205.4,96.6 C205.1,102.4 203.0,107.8 198.3,112.5 C181.9,128.9 168.3,122.5 157.7,114.1 C157.9,116.9 156.7,120.9 152.7,124.9 L141.0,136.5 C139.8,137.7 141.6,141.9 141.8,141.8 Z" fill="currentColor" class="octo-body"></path></svg></a><style>.github-corner:hover .octo-arm{animation:octocat-wave 560ms ease-in-out}@keyframes octocat-wave{0%,100%{transform:rotate(0)}20%,60%{transform:rotate(-25deg)}40%,80%{transform:rotate(10deg)}}@media (max-width:500px){.github-corner:hover .octo-arm{animation:none}.github-corner .octo-arm{animation:octocat-wave 560ms ease-in-out}}</style>
        
        <table 
            border="0"
            class="col-12"
        >
            <tr class="header">
                <td class="col-12" colspan="2">
                    <div class="headline">
                        <h1 class="special-fantasy-font-block">Лабораторная работа</h1><h1 style="user-select: none;" id="counter" value="2">2</h1>
                    </div>
                    <p><a color="white" href="/lab2/">На главную</a></p>
                    <hr>
                    <p class="pd-10px font-code">Снагин Станислав P3215 | 73034 вар.</p>ё
                </td>
            </tr>
            <tr class="sn-website-container">
                <td class="col-4">
                    <section>
                        <h2>Доп таска</h2>
                        <%--                        КОД ЗДЕСЬ--%>
                    </section>
                </td>
                <td class="col-8">
                    <style>
                        .example {
                            background: #f8f4ff;
                            padding: 20px;
                            border-radius: 8px;
                            border-left: 4px solid #5c0377;
                        }

                        .example h3 {
                            color: #5c0377;
                            margin-top: 0;
                        }

                        .code {
                            background: #2e1c31;
                            color: #c489f5;
                            padding: 15px;
                            border-radius: 6px;
                            font-family: 'Courier New', monospace;
                            margin: 15px 0;
                            overflow-x: auto;
                        }
                    </style>

                        <section>
                            <div class="example">

                                <h3>Таблица с \t</h3>
                                <data:table id="example2" separator=";" sortable="true" striped="true" pageSize="10">
                                Имя;Возраст;Город;Зарплата
                                Иван Петров;25;Москва;80000
                                Мария Сидорова;30;Санкт-Петербург;95000
                                Петр Иванов;28;Казань;70000
                                Иван Петров;25;Москва;80000
                                Мария Сидорова;30;Санкт-Петербург;95000
                                Петр Иванов;28;Казань;70000
                                Иван Петров;25;Москва;80000
                                Мария Сидорова;30;Санкт-Петербург;95000
                                Петр Иванов;28;Казань;70000
                                Иван Петров;25;Москва;80000
                                Мария Сидорова;30;Санкт-Петербург;95000
                                Петр Иванов;28;Казань;70000
                                Иван Петров;25;Москва;80000
                                Мария Сидорова;30;Санкт-Петербург;95000
                                Петр Иванов;28;Казань;70000
                                Иван Петров;25;Москва;80000
                                Мария Сидорова;30;Санкт-Петербург;95000
                                Петр Иванов;28;Казань;70000
                                Иван Петров;25;Москва;80000
                                Мария Сидорова;30;Санкт-Петербург;95000
                                Петр Иванов;28;Казань;70000
                                Иван Петров;25;Москва;80000
                                Мария Сидорова;30;Санкт-Петербург;95000
                                Петр Иванов;28;Казань;70000
                                Иван Петров;25;Москва;80000
                                Мария Сидорова;30;Санкт-Петербург;95000
                                Петр Иванов;28;Казань;70000
                                Иван Петров;25;Москва;80000
                                Мария Сидорова;30;Санкт-Петербург;95000
                                Петр Иванов;28;Казань;70000
                                
                                </data:table>
                            </div>
                            <div class="example">
                                <h3>Таблица с сортировкой</h3>
                                <data:table id="example1" separator=";" sortable="true" striped="true">
                                    Имя;Возраст;Город;Зарплата
                                    Иван Петров;25;Москва;80000
                                    Мария Сидорова;30;Санкт-Петербург;95000
                                    Петр Иванов;28;Казань;70000
                                    Анна Козлова;22;Новосибирск;65000
                                    Сергей Волков;35;Екатеринбург;110000
                                </data:table>
                            </div>
                    </section>
                </td>
            </tr>
        </table>

        <!-- JS BUNDLE --> 
        <script src="dist/js/main.js"></script>
    </body>
</html>