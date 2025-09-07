import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const GraphCanvas = ({ data, isDirected }) => {
  const svgRef = useRef(null);

  useEffect(() => {
    if (!data || !data.nodes || data.nodes.length === 0) {
        const svg = d3.select(svgRef.current);
        svg.selectAll("*").remove();
        return;
    };

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const width = 600;
    const height = 400;
    svg.attr('viewBox', `0 0 ${width} ${height}`);

    svg.append('defs').append('marker')
      .attr('id', 'arrowhead')
      .attr('viewBox', '-0 -5 10 10')
      .attr('refX', 23)
      .attr('refY', 0)
      .attr('orient', 'auto')
      .attr('markerWidth', 10)
      .attr('markerHeight', 10)
      .attr('xoverflow', 'visible')
      .append('svg:path')
      .attr('d', 'M 0,-5 L 10 ,0 L 0,5')
      .attr('fill', 'var(--primary-color)')
      .style('stroke', 'none');

    const simulation = d3.forceSimulation(data.nodes)
      .force("link", d3.forceLink(data.links).id(d => d.id).distance(100))
      .force("charge", d3.forceManyBody().strength(-250))
      .force("center", d3.forceCenter(width / 2, height / 2));

    const link = svg.append("g")
      .selectAll("line")
      .data(data.links)
      .enter().append("line")
      .attr("stroke", "var(--primary-color)")
      .attr("stroke-opacity", 0.6)
      .attr("stroke-width", 2)
      // ✨ FIX: Conditionally apply the marker for directed graphs
      .attr('marker-end', isDirected ? 'url(#arrowhead)' : null);

    const node = svg.append("g")
      .selectAll("circle")
      .data(data.nodes)
      .enter().append("circle")
      .attr("r", 20)
      .attr("fill", "var(--bg-container)")
      .attr("stroke", "var(--primary-color)")
      .attr("stroke-width", 3)
      .call(d3.drag()
          .on("start", dragstarted)
          .on("drag", dragged)
          .on("end", dragended));

    const label = svg.append("g")
      .selectAll("text")
      .data(data.nodes)
      .enter().append("text")
      .text(d => d.id)
      .attr('x', 6)
      .attr('y', 3)
      .attr("text-anchor", "middle")
      .attr("dy", ".35em")
      .attr("fill", "var(--text-light)")
      .style("font-weight", "bold");

    simulation.on("tick", () => {
      link
        .attr("x1", d => d.source.x)
        .attr("y1", d => d.source.y)
        .attr("x2", d => d.target.x)
        .attr("y2", d => d.target.y);

      node
        .attr("cx", d => d.x)
        .attr("cy", d => d.y);

      label
        .attr("x", d => d.x)
        .attr("y", d => d.y);
    });

    function dragstarted(event, d) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
    }
    function dragged(event, d) {
      d.fx = event.x;
      d.fy = event.y;
    }
    function dragended(event, d) {
      if (!event.active) simulation.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    }

  }, [data, isDirected]);

  return <svg ref={svgRef} style={{width: '100%', height: '100%'}}></svg>;
};

export default GraphCanvas;
