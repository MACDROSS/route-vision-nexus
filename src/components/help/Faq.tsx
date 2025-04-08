
import React from "react";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const Faq: React.FC = () => {
  const faqItems = [
    {
      question: "How does route optimization work?",
      answer: "Our route optimization algorithm considers multiple factors such as distance, time windows, vehicle capacity, traffic patterns, and delivery priorities. It uses advanced algorithms to find the most efficient routes that minimize total distance and time while meeting all constraints. You can also add custom constraints and manually adjust routes as needed."
    },
    {
      question: "Can I export data from CourierTwin?",
      answer: "Yes, you can export data from most modules in various formats including CSV, Excel, PDF, and JSON. Look for the export button (usually a download icon) in the top right corner of data tables and visualization areas. You can also schedule regular exports to be sent automatically via email or to connected systems."
    },
    {
      question: "How do I set up compliance rules?",
      answer: "To set up compliance rules, navigate to the Compliance Monitoring section and click on 'Manage Rules'. From there, you can define custom rules based on regulatory requirements, assign priority levels, and set up automated checks. The system will then automatically flag any potential compliance issues across your logistics operations."
    },
    {
      question: "Can I integrate CourierTwin with my existing systems?",
      answer: "Yes, CourierTwin offers robust API integration capabilities to connect with your existing ERP, WMS, TMS, and other systems. We support real-time data synchronization, scheduled imports/exports, and custom webhooks. Contact our integration team for assistance with setting up specific integrations for your environment."
    },
    {
      question: "How do I create a new scenario?",
      answer: "To create a new scenario, navigate to the Scenarios page and click the 'New Scenario' button. You can start from scratch or duplicate an existing scenario as a baseline. Then, modify parameters such as fleet composition, facility locations, demand patterns, or service levels. Run the simulation to see the impact of these changes on your operations."
    },
    {
      question: "What data is needed to get started?",
      answer: "At minimum, you'll need delivery locations, time windows, and package information to begin using basic features. For more advanced functionality, you might want to import vehicle information, driver data, historical performance metrics, and facility details. Our Data Catalog module can help you manage and organize all your logistics data."
    },
    {
      question: "How frequently is the data updated?",
      answer: "Real-time data like vehicle locations and delivery status updates are refreshed every few minutes. Analytics and dashboard metrics are updated hourly by default, but this can be configured based on your needs. Historical data and scenarios are stored permanently until deleted and can be accessed anytime."
    },
    {
      question: "Can I customize the dashboard?",
      answer: "Yes, dashboards are fully customizable. You can add, remove, and rearrange widgets, change time ranges for displayed data, and create multiple specialized dashboards for different teams or purposes. Look for the 'Customize' button in the top right corner of any dashboard to begin making changes."
    }
  ];

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Frequently Asked Questions</CardTitle>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible className="w-full">
          {faqItems.map((item, index) => (
            <AccordionItem key={index} value={`faq-${index}`}>
              <AccordionTrigger>{item.question}</AccordionTrigger>
              <AccordionContent>
                <p className="text-muted-foreground">{item.answer}</p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
    </Card>
  );
};
