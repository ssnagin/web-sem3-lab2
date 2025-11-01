package com.ssnagin.tags

import jakarta.servlet.jsp.JspException
import jakarta.servlet.jsp.JspWriter
import jakarta.servlet.jsp.tagext.SimpleTagSupport
import java.io.IOException
import java.io.StringWriter

class DataTableTag : SimpleTagSupport() {

    private var id: String = ""
    private var separator: String = ","
    private var sortable: Boolean = false
    private var striped: Boolean = false
    private var pageSize: Int? = null

    fun setId(id: String) {
        this.id = id
    }

    fun setSeparator(separator: String) {
        this.separator = separator
    }

    fun setSortable(sortable: Boolean) {
        this.sortable = sortable
    }

    fun setStriped(striped: Boolean) {
        this.striped = striped
    }

    fun setPageSize(pageSize: String?) {
        this.pageSize = pageSize?.trim()?.takeIf { it.isNotEmpty() }?.toIntOrNull()
    }

    @Throws(JspException::class, IOException::class)
    override fun doTag() {
        val out = jspContext.out
        val bodyContent = getBodyContentAsString()

        if (bodyContent.trim().isEmpty()) {
            out.print("<!-- Empty CSV body -->")
            return
        }

        val tableData = parseTableData(bodyContent)
        if (tableData.isEmpty()) {
            return
        }

        renderHtmlTable(out, tableData)
        renderJavaScript(out, tableData)
        renderCssStyles(out)
    }

    private fun parseTableData(body: String): TableData {
        val lines = body.split("\\r?\\n".toRegex())
        val rows = mutableListOf<Array<String>>()

        for (line in lines) {
            val trimmedLine = line.trim()
            if (trimmedLine.isNotEmpty()) {
                rows.add(trimmedLine.split(separator).toTypedArray())
            }
        }

        if (rows.isEmpty()) {
            return TableData.EMPTY
        }

        val headers = rows.first()
        val dataRows = rows.drop(1)

        return TableData(headers, dataRows)
    }

    @Throws(IOException::class)
    private fun renderHtmlTable(out: JspWriter, data: TableData) {
        val tableClass = "data-table" + if (striped) " striped" else ""

        val html = """
            <table id="$id" class="$tableClass">
              <thead>
                <tr>
                  ${renderHeaders(data.headers)}
                </tr>
              </thead>
              <tbody>
                ${renderTableBody(data.rows)}
              </tbody>
            </table>
        """.trimIndent()

        out.print(html)
    }

    private fun renderHeaders(headers: Array<String>): String {
        return headers.joinToString("") { header ->
            val escapedHeader = escapeHtml(header)
            if (sortable) {
                """<th data-sort="$escapedHeader">$escapedHeader <span class="sort-indicator">↕</span></th>"""
            } else {
                "<th>$escapedHeader</th>"
            }
        }
    }

    private fun renderTableBody(rows: List<Array<String>>): String {
        return rows.joinToString("") { row ->
            val cells = row.joinToString("") { cell ->
                "<td>${escapeHtml(cell)}</td>"
            }
            "<tr>$cells</tr>"
        }
    }

    @Throws(IOException::class)
    private fun renderJavaScript(out: JspWriter, data: TableData) {
        val sortingScript = if (sortable) getSortingScript() else ""
        val paginationScript = if (shouldRenderPagination(data)) getPaginationScript(data.rows.size) else ""

        val script = """
            <script>
            (function() {
              'use strict';
              const table = document.getElementById('$id');
              if (!table) return;
            $sortingScript
            $paginationScript
            })();
            </script>
        """.trimIndent()

        out.print(script)
    }

    private fun getSortingScript(): String {
        return """
            
              // Sorting functionality
              const sortState = {};
              const headerCells = table.querySelectorAll('thead th');
              
              headerCells.forEach((headerCell, columnIndex) => {
                headerCell.style.cursor = 'pointer';
                headerCell.addEventListener('click', () => {
                  const sortKey = headerCell.dataset.sort;
                  const currentDirection = sortState[sortKey];
                  const newDirection = currentDirection === 'asc' ? 'desc' : 'asc';
                  
                  sortState[sortKey] = newDirection;
                  sortTableByColumn(columnIndex, newDirection);
                  updateSortIndicators(headerCell, newDirection);
                });
              });
              
              function sortTableByColumn(columnIndex, direction) {
                const tbody = table.querySelector('tbody');
                const rows = Array.from(tbody.querySelectorAll('tr'));
                
                rows.sort((rowA, rowB) => {
                  const cellA = rowA.cells[columnIndex].textContent.trim();
                  const cellB = rowB.cells[columnIndex].textContent.trim();
                  const numA = parseFloat(cellA);
                  const numB = parseFloat(cellB);
                  
                  let comparison = 0;
                  if (!isNaN(numA) && !isNaN(numB)) {
                    comparison = numA - numB;
                  } else {
                    comparison = cellA.localeCompare(cellB);
                  }
                  
                  return direction === 'asc' ? comparison : -comparison;
                });
                
                rows.forEach(row => tbody.appendChild(row));
              }
              
              function updateSortIndicators(activeHeader, direction) {
                const allIndicators = table.querySelectorAll('.sort-indicator');
                allIndicators.forEach(indicator => indicator.textContent = '↕');
                
                const activeIndicator = activeHeader.querySelector('.sort-indicator');
                activeIndicator.textContent = direction === 'asc' ? '↑' : '↓';
              }
        """.trimIndent()
    }

    private fun getPaginationScript(rowCount: Int): String {
        val pageSizeValue = pageSize ?: return ""

        return """
            
              // Pagination functionality
              const rows = Array.from(table.querySelectorAll('tbody tr'));
              const totalPages = Math.ceil(rows.length / $pageSizeValue);
              let currentPage = 1;
              
              function showPage(page) {
                rows.forEach((row, index) => {
                  const startIndex = (page - 1) * $pageSizeValue;
                  const endIndex = page * $pageSizeValue;
                  row.style.display = (index >= startIndex && index < endIndex) ? '' : 'none';
                });
                currentPage = page;
              }
              
              showPage(1);
              
              const paginationContainer = document.createElement('div');
              paginationContainer.className = 'data-table-pagination';
              paginationContainer.style.marginTop = '10px';
              
              for (let i = 1; i <= totalPages; i++) {
                const pageButton = document.createElement('button');
                pageButton.textContent = i;
                pageButton.style.margin = '0 2px';
                pageButton.style.padding = '4px 8px';
                pageButton.onclick = () => showPage(i);
                paginationContainer.appendChild(pageButton);
              }
              
              table.parentNode.insertBefore(paginationContainer, table.nextSibling);
        """.trimIndent()
    }

    @Throws(IOException::class)
    private fun renderCssStyles(out: JspWriter) {
        val styles = """
            <style>
            </style>
        """.trimIndent()

        out.print(styles)
    }

    private fun shouldRenderPagination(data: TableData): Boolean {
        return pageSize != null && pageSize!! > 0 && data.rows.isNotEmpty()
    }

    @Throws(IOException::class)
    private fun getBodyContentAsString(): String {
        return StringWriter().use { sw ->
            jspBody?.invoke(sw)
            sw.toString()
        }
    }

    private fun escapeHtml(text: String): String {
        if (text.isEmpty()) return ""
        return text.replace("&", "&amp;")
            .replace("<", "&lt;")
            .replace(">", "&gt;")
            .replace("\"", "&quot;")
            .replace("'", "&#x27;")
    }

    private data class TableData(
        val headers: Array<String>,
        val rows: List<Array<String>>
    ) {
        fun isEmpty(): Boolean {
            return headers.isEmpty() || rows.isEmpty()
        }

        companion object {
            val EMPTY = TableData(emptyArray(), emptyList())
        }

        override fun equals(other: Any?): Boolean {
            if (this === other) return true
            if (javaClass != other?.javaClass) return false

            other as TableData

            if (!headers.contentEquals(other.headers)) return false
            if (rows != other.rows) return false

            return true
        }

        override fun hashCode(): Int {
            var result = headers.contentHashCode()
            result = 31 * result + rows.hashCode()
            return result
        }
    }
}