import React, { useEffect, useState } from "react";
import axios from "../../../config/axios";
import { IBidInfo } from "../../../types";
import BidRow from "../../BidRow";
import Loading from "../../Loading";

interface IBidsHistoryProps {
  tokenId: number;
  collectionAddress: string;
}

const BidsHistory = ({
  tokenId,
  collectionAddress,
}: IBidsHistoryProps): JSX.Element => {
  const [bids, setBids] = useState<IBidInfo[]>([]);
  const [loading, setLoading] = useState(true);

  const getBidsHistory = async (): Promise<void> => {
    setLoading(true);
    axios
      .get(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}api/market/listBids`, {
        params: {
          tokenId,
          collectionAddress,
        },
      })
      .then((response) => setBids(response.data))
      .catch((error) => alert(error.response.data.error))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    getBidsHistory();
  }, []);

  if (loading) return <Loading />;

  return (
    <div className="max-h-44 overflow-y-scroll">
      {bids.map(({ bid, bidder, nftId, date }) => (
        <BidRow
          bid={bid}
          bidder={bidder}
          nftId={nftId}
          date={date}
          key={`${nftId} ${bidder} ${date} ${bid}`}
        />
      ))}
    </div>
  );
};

export default BidsHistory;
