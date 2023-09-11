import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';

type IRequest = {
  url: string;
  invokeImmediately?: boolean;
} & (
  | {
      method: 'GET' | 'DELETE';
    }
  | {
      method: 'POST' | 'PUT';
      body: any;
    }
);

export const useRequest = (options: IRequest) => {
  const { url, method, invokeImmediately = true } = options;
  let body: any = null;
  if (method === 'POST' || method === 'PUT') {
    body = options.body;
  }

  const [loading, setLoading] = useState<any>(invokeImmediately || false);
  const [error, setError] = useState(null);
  const [data, setData] = useState<any>(null);

  const doRequest = useCallback(async () => {
    try {
      if (data) return data;
      setLoading(true);
      // await new Promise((resolve) => setTimeout(resolve, 10000));
      const response = await axios({
        method,
        url,
        data: body,
      });
      setLoading(false);
      setData(response.data);
    } catch (err: any) {
      setLoading(false);
      setError(err?.response?.data);
    }
  }, [method, url, body, data]);

  const invalidate = useCallback(async () => doRequest(), [doRequest]);

  useEffect(() => {
    if (invokeImmediately) {
      doRequest();
    }
  }, [invokeImmediately, doRequest]);

  return { loading, error, data, invalidate };
};
