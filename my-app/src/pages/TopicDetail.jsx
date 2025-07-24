import { useParams } from 'react-router-dom';

const topicContent = {
  percentage: {
    title: "Percentage",
    description: "Percentage is a way of expressing a number as a fraction of 100. It's useful in exams, discounts, profit/loss, etc.",
  },
  'profit-loss': {
    title: "Profit & Loss",
    description: "This topic includes concepts of cost price, selling price, and how to calculate profit/loss percentages.",
  },
  'time-work': {
    title: "Time & Work",
    description: "Time and work problems involve calculating how much time is needed for a task or how many people are needed.",
  },
  'speed-distance': {
    title: "Speed & Distance",
    description: "Speed, time, and distance are commonly tested together. Use the formula: Speed = Distance / Time.",
  },
  ratio: {
    title: "Ratio",
    description: "A ratio compares two quantities and is used in problems involving parts, mixtures, and distribution.",
  },
  'number-series': {
    title: "Number Series",
    description: "This involves identifying patterns or logic behind sequences of numbers to find the missing term.",
  },
  ages: {
    title: "Ages",
    description: "Problems on ages use algebraic equations based on age differences and future/past age conditions.",
  },
  'simple-interest': {
    title: "Simple Interest",
    description: "SI is calculated using the formula: SI = (P × R × T) / 100 where P is principal, R is rate, and T is time.",
  },
  probability: {
    title: "Probability",
    description: "Probability is the measure of the likelihood of an event. It's between 0 and 1.",
  },
  average: {
    title: "Average",
    description: "Average = (Sum of items) / (Number of items). Useful for finding typical values in a dataset.",
  }
};

function TopicDetail() {
  const { topicId } = useParams();
  const content = topicContent[topicId];

  if (!content) {
    return <h2 style={{ padding: "40px" }}>Topic not found.</h2>;
  }

  return (
    <div style={{ padding: "40px" }}>
      <h2>{content.title}</h2>
      <p style={{ fontSize: '18px', lineHeight: '1.6' }}>{content.description}</p>
    </div>
  );
}

export default TopicDetail;
