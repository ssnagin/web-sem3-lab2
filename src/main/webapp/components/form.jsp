<%@ page contentType="text/html;charset=UTF-8" language="java" pageEncoding="UTF-8" %>

<form id="sn-form-1" action="${pageContext.request.contextPath}/controller" method="post" class="sn-default-form">

    <input type="hidden" name="sn-form" value="areaCheck" hidden readonly/>

    <h2>Отправить точку в полёт</h2>

    <br>

    <label for="x">Координата X</label>
    <div>
        <select name="x" id="x" required>
            <option value="-2">-2</option>
            <option value="-1.5">-1.5</option>
            <option value="-1">-1</option>
            <option value="-0.5">-0.5</option>
            <option value="0">0</option>
            <option value="0.5">0.5</option>
            <option value="1">-1</option>
            <option value="1.5">1.5</option>
            <option value="2">2</option>
        </select>
    </div>
    
    <label for="CoordY">Координата Y</label>
    
    <div>
        <input name="y" id="CoordY" pattern="-?[0-9]+(\.[0-9]+)?" title="Число от -3 до 5" class="col-12" type="text" min="-3" max="5" placeholder="    Цифорка Y" required/>
    </div>
    
    <label for="CoordR">Радиус</label>
    
    <table class="pd-10px col-12">
        <tr id="z-checkbox-container">
            <td><input name="R" type="radio" value="1" id="checkbox1" checked="checked"><label for="checkbox1">1</label></td>
            <td><input name="R" type="radio" value="1.5" id="checkbox2"><label for="checkbox2"> 1.5</label></td>
            <td><input name="R" type="radio" value="2" id="checkbox3"><label for="checkbox3"> 2</label></td>
            <td><input name="R" type="radio" value="2.5" id="checkbox4"><label for="checkbox4"> 2.5</label></td>
            <td><input name="R" type="radio" value="3" id="checkbox5"><label for="checkbox5"> 3</label></td>
        </tr>
    </table>

    <div><input id="form-submit" class="col-12 pd-10px" type="submit" value="Отправить!" /></div>

    <div id="error-field">
    </div>
</form>