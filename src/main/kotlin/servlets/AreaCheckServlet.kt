package com.ssnagin.controllers

import com.ssnagin.context.Point2DRRow
import com.ssnagin.controllers.wrappers.HttpPOSTServletWrapper
import com.ssnagin.servlets.coordinates.builders.Point2DRBuilder
import com.ssnagin.servlets.coordinates.geometry.Point2DR
import com.ssnagin.servlets.coordinates.validator.GeometryValidator
import jakarta.servlet.ServletConfig
import jakarta.servlet.annotation.WebServlet
import jakarta.servlet.http.HttpServletRequest
import jakarta.servlet.http.HttpServletResponse
import javax.xml.validation.Validator
import kotlin.collections.mutableListOf

@WebServlet("/areaCheck")
class AreaCheckServlet : HttpPOSTServletWrapper() {

    override fun init(config : ServletConfig) {
        super.init(config)
    }

    override fun doPost(request: HttpServletRequest, response: HttpServletResponse) {

        val startTime: Long = System.nanoTime()
        val context = request.servletContext

        val point2DR = Point2DRBuilder.build(
            xObj = request.getParameter("x"),
            yObj = request.getParameter("y"),
            RObj = request.getParameter("R")
        )

        val endTime: Long = System.nanoTime()

        val pointRow = Point2DRow(
            point2DR = point2DR,
            executionTime = executionTime,
            isInArea = GeometryValidator().validate(point2DR)
        )

        val rows = context.getAttribute("coordinates") as? MutableList<Point2DRRow> ?: mutableListOf()

        rows.add(data)
        context.setAttribute("coordinates", coordinates)

        response.sendRedirect(request.contextPath +"/result.jsp")
    }
}