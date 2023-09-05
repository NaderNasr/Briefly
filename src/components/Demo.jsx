import { useState, useEffect } from "react"
import { PiCopyBold, PiLinkSimple } from "react-icons/pi"
// import { TiTick } from "react-icons/ti"
import { PiArrowBendDownLeftBold } from "react-icons/pi"
import { RaceBy } from '@uiball/loaders'
import { TiTick } from 'react-icons/ti'
import { motion } from 'framer-motion';
import { useLazyGetSummaryQuery } from "../services/article";

const Demo = () => {

  const [article, setArticle] = useState({
    url: '',
    summary: '',
  })
  const [allArticles, setAllArticles] = useState([]);
  const [getSummary, { error, isFetching }] = useLazyGetSummaryQuery();
  const [copy, setCopy] = useState('')
  const [showLabel, setShowLabel] = useState(false);

  useEffect(() => {
    const articlesFromLocalStorage = JSON.parse(localStorage.getItem('articles'))
    if (articlesFromLocalStorage) {
      setAllArticles(articlesFromLocalStorage)
    }
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await getSummary({ articleUrl: article.url });
      if (data?.summary) {
        const newArticle = { ...article, summary: data.summary };
        setArticle(newArticle);
        const updatedArticles = [newArticle, ...allArticles];
        console.log(newArticle);
        // local storage can only store strings
        localStorage.setItem('articles', JSON.stringify(updatedArticles));
      }
    } catch (error) {
      if (error.status === 503) {
        // Service Unavailable, retry after a delay
        setTimeout(async () => {
          try {
            const { data } = await getSummary({ articleUrl: article.url });
            if (data?.summary) {
              const newArticle = { ...article, summary: data.summary };
              setArticle(newArticle);
              const updatedArticles = [newArticle, ...allArticles];
              console.log(newArticle);
              // local storage can only store strings
              localStorage.setItem('articles', JSON.stringify(updatedArticles));
            }
          } catch (retryError) {
            alert('Service is still unavailable.');
          }
        }, 5000); // Retry after 5 seconds
      } else {
        alert('An error occurred: ' + error.message);
      }
    }
  };
  // Copy url to clipboard
  const handleCopy = (url) => {
    setCopy(url)
    setShowLabel(!showLabel);
    navigator.clipboard.writeText(url)
    setTimeout(() => {
      setCopy(false)
      setShowLabel(false);
    }, 2000)
  }

  return (
    <section className="mt-16 w-full max-w-xl">
      {/* Search */}

      <div className="flex flex-col w-full gap-2">
        <motion.div
          initial={{ opacity: 0, y: -70 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <form className="relative flex justify-center items-center" onSubmit={handleSubmit}>
            <PiLinkSimple className="absolute left-0 my-2 ml-3 w-5" />
            <input
              type="url"
              placeholder="https://example.com"
              value={article.url}
              onChange={(e) => {
                setArticle({ ...article, url: e.target.value })
              }}
              required
              className="url_input peer"
            />
            <button
              type="submit"
              className="submit_btn peer-focus:border-orange-700">
              <PiArrowBendDownLeftBold className="w-5" />
            </button>
          </form>
        </motion.div>
        {/* URL History */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
        >
          <div className="flex flex-col gap-1 max-h-60 overflow-y-auto">
            {allArticles.map((article, index) => (
              <div
                key={`link-${index}`}
                onClick={() => setArticle(article)}
                className="link_card"
              >
                <div className="copy_btn" onClick={() => handleCopy(article.url)}>
                  {copy === article.url ? <TiTick className="w-5" /> : <PiCopyBold className="w-5" alt='copy url' />}
                </div>
                <p className="flex-1 font-satoshi text-blue-700 font-medium text-sm truncate">
                  {article.url}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Display Results */}
      <div className="my-10 max-w-full flex justify-center items-center">
        {isFetching ? (
          <RaceBy className="w-20 h-20 object-contain" />
        ) : error ? (
          <p className="font-inter font-bold text-black text-center">Oops, something went wrong...
            <br />
            <span className="font-satoshi font-normal text-gray-700">
              {error?.data?.error}
            </span>
          </p>
        ) : (
          article.summary && (
            <div className="flex flex-col gap-3">
              <h2 className="font-satoshi font-bold text-gray-600 text-xl">
                Article Summary
              </h2>
              <div className="summary_box">

                <div className="ml-auto mb-5 copy_btn flex justify-between items-center" onClick={() => handleCopy(article.summary)}>
                  {copy === article.summary ? <TiTick className="w-5" /> : <PiCopyBold className="w-5" alt='copy url' />}
                  {showLabel && (
                    <div className="text-xs font-semibold inline-block py-1 px-2 rounded text-cyan-600 bg-cyan-200 last:mr-0 mr-1">Copied!</div>
                  )}
                </div>

                <p className="font-inter font-medium text-sm text-gray-700">{article.summary}</p>
              </div>
            </div>
          )
        )}
      </div>
    </section>
  )
}

export default Demo