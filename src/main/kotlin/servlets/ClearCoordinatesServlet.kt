package com.ssnagin.servlets

import com.ssnagin.context.Point2DRRow
import com.ssnagin.controllers.wrappers.HttpPOSTServletWrapper
import jakarta.servlet.annotation.WebServlet
import jakarta.servlet.http.HttpServletRequest
import jakarta.servlet.http.HttpServletResponse

@WebServlet("/clearCoordinates")
class ClearCoordinatesServlet : HttpPOSTServletWrapper() {

    override fun doPost(request: HttpServletRequest, response: HttpServletResponse) {
        val context = request.servletContext

        context.setAttribute("coordinates", mutableListOf<Point2DRRow>())

        response.status = HttpServletResponse.SC_OK

        response.sendRedirect(request.contextPath +"/result.jsp")
    }
}