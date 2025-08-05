import { useEffect, useState } from "react";
import type { Art } from "../../../models/Art";
import { getArtsByStore } from "../../../utils/arts";
import { auctionPostApi } from "../../../services/AuctionServices";
import { Col, Row } from "react-bootstrap";
import Form from "../../../components/ui/Form/Form";
import Input from "../../../components/ui/Input/Input";
import Select from "../../../components/ui/Select/Select";
import PrimaryButton from "../../../components/ui/Buttons/PrimaryButton/PrimaryButton";

type Option = {
    value: string;
    label: string;
};

const StartAuction = () => {
  const [arts, setArts] = useState<Art[] | undefined | null>(null);
  const [artValue, setArtValue] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const storeId = localStorage.getItem('storeId');

  useEffect(() => {
    if (storeId) {
        getArtsByStore(parseInt(storeId), 1, 10, setArts);
    }
  }, [storeId]);

  const artOptions: Option[] = arts
    ? arts.map((art) => ({
        value: art.id.toString(),
        label: art.title,
    }))
    : [];
  
  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    const now = new Date();
    const selectedStartDate = new Date(startDate);
    const selectedEndDate = new Date(endDate);

    if (selectedStartDate < now) {
        alert(
            'The start date cannot be in the past. Please select a valid future date.'
        );
        return;
    }

    if (selectedEndDate <= selectedStartDate) {
        alert(
            'The end date must be later than the start date.'
        );
        return;
    }

    if (startDate && endDate) {
        auctionPostApi(startDate, endDate, parseInt(artValue));
    } else {
        console.error('Start Date or End Date is null');
    }
  };

  return (
    <Row style={{ width: '100%' }}>
        <Form onSubmit={handleSubmit}>
            <Col md={6} className="mb-20">
                <Input
                  label='Auction Start Date & Time'
                  type='datetime-local'
                  id='startDate'
                  name='startDate'
                  value={startDate ? startDate : ''}
                  onChange={(e) => setStartDate(e.target.value)}
                />
            </Col>
            <Col md={6} className='mb-20'>
              <Input
                label='Auction End Date & Time'
                type='datetime-local'
                id='endDate'
                name='endDate'
                value={endDate ? endDate : ''}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </Col>
            <Col md={6} className='mb-20'>
              <Select
                label='Select the Art'
                id='art'
                name='art'
                options={artOptions}
                onChange={(e) => setArtValue(e.target.value)}
              />
            </Col>
            <div className="auth-btn">
                <PrimaryButton variant='white' text='Start Auction' type='submit' />
            </div>
        </Form>
    </Row>
  );
};

export default StartAuction;
