"use client"

import React, { FC } from 'react'
import { Table, NavLink, Anchor } from '@mantine/core'
import { IconHome2 } from '@tabler/icons-react';

const logProjects = [
    {
        id: "a84d8905-6d96-42a2-95d8-4ef234826eec",
        title: "WebLogTrack: Log Analysis and Monitoring",
        // description: "Develop a tool for analyzing and visualizing log data from various sources. Create custom dashboards to monitor system health and performance.",
        // technologies: ["JavaScript", "Node.js", "Elasticsearch", "Kibana"],
        // teamMembers: ["Front-end Developer", "Back-end Developer", "DevOps Engineer"],
        duration: "6 months",
    },
    {
        id: "9a392c14-3d3b-4a71-89cf-365a49e83c67",
        title: "ServerLogPro: Real-time Logging System",
        // description: "Build a system for real-time application logging that allows developers to monitor and troubleshoot issues as they happen.",
        // technologies: ["Python", "Flask", "WebSocket", "Docker"],
        // teamMembers: ["Full Stack Developer", "DevOps Engineer"],
        duration: "4 months",
    },
    {
        id: "6fe96059-8e0a-4b02-9760-7e8c196c30e1",
        title: "LogArchiveX: Log Archiving and Retention Solution",
        // description: "Create a log archiving system that securely stores logs for compliance and troubleshooting purposes. Implement policies for log retention and disposal.",
        // technologies: ["Java", "MySQL", "AWS S3"],
        // teamMembers: ["Software Architect", "Database Administrator"],
        duration: "8 months",
    },
    {
        id: "f02d9a7c-1ef2-465a-ba09-9c09ed2e4e94",
        title: "CentralLogHub: Centralized Logging Service",
        // description: "Build a centralized logging service to aggregate logs from different sources and provide a unified interface for log management and analysis.",
        // technologies: ["Python", "Logstash", "Kibana", "AWS"],
        // teamMembers: ["DevOps Engineer", "Data Engineer", "Front-end Developer"],
        duration: "7 months",
    },
    {
        id: "89ef480d-85c5-46b3-8c6c-eb82ab3f9c07",
        title: "AnomalyLogDetect: AI-Driven Log Anomaly Detection",
        // description: "Develop an AI-driven system that can detect anomalies in log data to identify potential security threats or operational issues.",
        // technologies: ["Python", "TensorFlow", "Kafka"],
        // teamMembers: ["Data Scientist", "Machine Learning Engineer"],
        duration: "10 months",
    },
    {
        id: "2f140d6a-88c1-4a90-b4a6-1a722d4c6e31",
        title: "LogVizPro: Log Data Visualization Tool",
        // description: "Create a tool that visualizes log data using charts, graphs, and heatmaps, making it easier to identify trends and anomalies.",
        // technologies: ["JavaScript", "D3.js", "React", "MongoDB"],
        // teamMembers: ["Front-end Developer", "Back-end Developer", "UI/UX Designer"],
        duration: "5 months",
    },
    {
        id: "b1a4fc64-01cb-47da-9d77-7a10d36e22d7",
        title: "LogExportXpert: Log Data Exporter",
        // description: "Build a tool to export log data to different formats (e.g., CSV, JSON) and integrate with external systems for reporting and analysis.",
        // technologies: ["Java", "Spring Boot", "RabbitMQ"],
        // teamMembers: ["Back-end Developer", "Integration Specialist"],
        duration: "6 months",
    },
    {
        id: "5df55ed3-51c1-4e1a-96e2-7f0d9d34cb07",
        title: "IoTLogMonitor: IoT Device Log Monitoring",
        // description: "Design a solution for monitoring and analyzing logs from Internet of Things (IoT) devices to ensure their reliability and security.",
        // technologies: ["C/C++", "MQTT", "InfluxDB"],
        // teamMembers: ["Embedded Systems Engineer", "IoT Specialist"],
        duration: "9 months",
    },
    {
        id: "14633b11-ecc9-4e85-b84c-48a4388e1d49",
        title: "AlertLogX: Custom Log Alerting System",
        // description: "Develop a system that generates alerts based on predefined log patterns, helping teams respond quickly to critical issues.",
        // technologies: ["Ruby", "Elasticsearch", "Slack Integration"],
        // teamMembers: ["Ruby Developer", "DevOps Engineer"],
        duration: "4 months",
    },
    {
        id: "d3b9f1c3-7ec4-4e22-9c72-02a7a7e08ec7",
        title: "ComplianceLogPro: Log Management and Compliance Tool",
        // description: "Create a comprehensive log management and compliance tool to assist organizations in meeting regulatory requirements.",
        // technologies: [".NET Core", "SQL Server", "Active Directory Integration"],
        // teamMembers: ["Full Stack Developer", "Compliance Specialist"],
        duration: "12 months",
    },
];


interface pageProps { }
const page: FC<pageProps> = async ({ }) => {
    const rows = logProjects.map((project) => (
        <Table.Tr key={project.title}>
            <Table.Td>{project.title}</Table.Td>
            {/* <Table.Td>{project.description}</Table.Td> */}
            {/* <Table.Td>{project.technologies}</Table.Td>
            <Table.Td>{project.teamMembers}</Table.Td> */}
            <Table.Td>{project.duration}</Table.Td>
            <Table.Td>
                <Anchor href={`/dashboard/projects/${project.id}`} target="_blank">
                    Inspect
                </Anchor>
            </Table.Td>
        </Table.Tr>
    ));
    return (
        <main>
            <h1>Projects List</h1>
            <Table
                horizontalSpacing="xl"
                verticalSpacing="sm"
                captionSide="bottom"
                striped
                highlightOnHover
                withRowBorders={false}
            >
                <Table.Caption>Logs Projects List</Table.Caption>
                <Table.Thead>
                    <Table.Tr>
                        {Object.keys(logProjects[0]).filter((key)=>key !== 'id').map((projectKey) => {
                            return <Table.Th className='capitalize'>{projectKey}</Table.Th>
                        })}
                        <Table.Th></Table.Th>
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>{rows}</Table.Tbody>
            </Table>
        </main>
    )
}

export default page