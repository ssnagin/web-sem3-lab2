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

            val executionTime : Long

            val point2DR = Point2DRBuilder.build(
                xObj = request.getParameter("x"),
                yObj = request.getParameter("y"),
                RObj = request.getParameter("R")
            )

            val pointRow = Point2DRRow(
                point2DR = point2DR,
                executionTime = 0,
                isInArea = false
            )

            try {
                GeometryValidator().validate(point2DR)
                pointRow.isInArea = true
            } catch (_: Exception) {}

            executionTime =  System.nanoTime() - startTime
            pointRow.executionTime = executionTime

            try {

                System.out.println(pointRow.toString())
                val rows = (context.getAttribute("coordinates") as? MutableList<Point2DRRow>) ?: mutableListOf()
                rows.add(pointRow)
                context.setAttribute("coordinates", rows)
                println("Saved to context: ${rows.size} rows total")
            } catch (e : Exception) {
                println("ERROR couldn't add coordinates for $pointRow")
                response.sendError(500, "ERROR couldn't add coordinates for $pointRow")
            }

            request.getRequestDispatcher("/result.jsp").forward(request, response);
        }
    }