package com.ssnagin.controllers

import com.ssnagin.controllers.wrappers.HttpPOSTServletWrapper
import jakarta.servlet.annotation.WebServlet
import jakarta.servlet.http.HttpServletRequest
import jakarta.servlet.http.HttpServletResponse

@WebServlet("areaCheck")
class AreaCheckServletWrapper : HttpPOSTServletWrapper() {

    override fun doPost(request: HttpServletRequest, response: HttpServletResponse) {
        super.doPost(request, response)

        val startTime: Long = System.nanoTime()
    }
}