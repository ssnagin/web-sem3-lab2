package com.ssnagin.controllers

import com.ssnagin.controllers.wrappers.HttpPOSTServletWrapper
import jakarta.servlet.ServletConfig
import jakarta.servlet.annotation.WebServlet
import jakarta.servlet.http.HttpServletRequest
import jakarta.servlet.http.HttpServletResponse

@WebServlet("/areaCheck")
class AreaCheckServlet : HttpPOSTServletWrapper() {

    override fun init(config : ServletConfig) {
        super.init(config)
    }

    override fun doPost(request: HttpServletRequest, response: HttpServletResponse) {

        val startTime: Long = System.nanoTime()

        response.sendRedirect(request.contextPath +"/result.jsp")
    }
}